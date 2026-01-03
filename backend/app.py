# ==============================================
# Road Safety Intervention GPT - FastAPI Backend
# ==============================================

import json
import os
import torch
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_community.vectorstores import FAISS

from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline


# ==============================================
# Initialize FastAPI
# ==============================================
app = FastAPI(
    title="Road Safety Intervention GPT API",
    description="RAG-powered backend using IRC standards",
    version="1.0.0"
)

# Allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==============================================
# Load Knowledge Base
# ==============================================
FILE_PATH = "knowledge_base.json"

with open(FILE_PATH, "r", encoding="utf-8") as f:
    data = json.load(f)

all_texts = [item["full_text"] for item in data]
all_metadata = [item["metadata"] for item in data]

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=600,
    chunk_overlap=120,
    length_function=len
)

chunks = []
chunk_meta = []

for txt, meta in zip(all_texts, all_metadata):
    split = text_splitter.split_text(txt)
    for c in split:
        chunks.append(c)
        chunk_meta.append(meta)


# ==============================================
# Embedding + Vector Store
# ==============================================
embeddings = SentenceTransformerEmbeddings(model_name='BAAI/bge-large-en-v1.5')
vector_store = FAISS.from_texts(chunks, embeddings, metadatas=chunk_meta)


# ==============================================
# Load Llama Model
# ==============================================
HF_TOKEN = os.getenv("HF_TOKEN")

if not HF_TOKEN:
    raise RuntimeError("HF_TOKEN environment variable is not set. Please export your Hugging Face token before starting the server.")
model_name = "meta-llama/Llama-3.2-3B-Instruct"

tokenizer = AutoTokenizer.from_pretrained(model_name, token=HF_TOKEN)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    device_map="cpu",
    torch_dtype=torch.bfloat16,
    token=HF_TOKEN
)

if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token

llm_generator = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    max_new_tokens=900
)


# ==============================================
# Intent Detection
# ==============================================
def detect_intent(query: str):
    q = query.lower()
    if "cost" in q or "price" in q or "estimate" in q:
        return "cost_estimate"
    if "fix" in q or "intervention" in q or "solution" in q:
        return "recommend_fix"
    if "clause" in q or "standard" in q or "compliance" in q:
        return "compliance_check"
    return "general_query"


# ==============================================
# Structured Answer Generator
# ==============================================
def generate_answer(context, query, intent):
    context_text = "\n".join(context)

    STRUCTURE_TEMPLATE = """
### 🔍 Problem Interpretation
Explain what the user's query is about.

### 📘 Relevant IRC Clauses
List exact clauses from the context.

### 🛠️ Recommended Intervention
Explain the specific intervention needed.

### 🧩 Why This Works
Explain the engineering logic.

### 📝 Step-by-Step Fix Guide
Provide 3–7 clear steps.

### 💰 Estimated Cost (if applicable)
Provide a cost range in ₹.

### ⚠️ Compliance Check (if intent == compliance_check)
State compliant/not compliant + clause.

### ✅ Final Answer
Short 3–5 line summary.
"""

    if intent == "general_query":
        role_prompt = "You are Road Safety Intervention GPT. Answer using IRC standards."
    elif intent == "recommend_fix":
        role_prompt = "You are an IRC-certified highway engineer. Recommend correct interventions."
    elif intent == "cost_estimate":
        role_prompt = "You are a cost estimation expert. Provide accurate cost ranges."
    elif intent == "compliance_check":
        role_prompt = "You are an IRC compliance auditor."

    system_prompt = f"{role_prompt}\nFollow this structure:\n{STRUCTURE_TEMPLATE}"

    user_prompt = f"Context:\n{context_text}\n\nUser Query: {query}\nGenerate a structured answer."

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
    ]

    prompt = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    response = llm_generator(prompt)[0]["generated_text"]
    answer = response[len(prompt):].strip()

    return answer


# ==============================================
# API Input Model
# ==============================================
class QueryRequest(BaseModel):
    query: str


# ==============================================
# API Routes
# ==============================================

@app.get("/")
def home():
    return {"message": "Road Safety Intervention GPT API is running!"}


@app.post("/ask")
def ask(request: QueryRequest):
    query = request.query
    intent = detect_intent(query)

    retrieved = vector_store.similarity_search(query, k=4)
    context = [doc.page_content for doc in retrieved]

    answer = generate_answer(context, query, intent)

    return {
        "query": query,
        "intent": intent,
        "answer": answer,
        "retrieved_chunks": len(context)
    }


@app.get("/metadata")
def get_metadata():
    return data


@app.get("/rebuild_index")
def rebuild_index():
    global vector_store

    vector_store = FAISS.from_texts(chunks, embeddings, metadatas=chunk_meta)

    return {"status": "Index rebuilt successfully"}


# ==============================================
# Run using:
# uvicorn main:app --reload
# uvicorn app:app --host 0.0.0.0 --port 8000 --reload
# ==============================================
