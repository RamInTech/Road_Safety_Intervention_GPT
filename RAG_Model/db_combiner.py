import json
import uuid


def build_knowledge_base(
        standards_path="standards.json",
        interventions_path="interventions.json",
        output_path="knowledge_base.json"
    ):


    final_database = []

    try:
        with open(standards_path, "r", encoding="utf-8") as f:
            standards_data = json.load(f)

        print(f"[OK] Loaded {len(standards_data)} items from {standards_path}")

        for item in standards_data:
            new_record = {
                "id": f"std-{item.get('s_no', uuid.uuid4())}",
                "intervention_name": item.get("type", "Unknown Type"),
                "content": item.get("data", ""),
                "metadata": {
                    "type": "Standard",
                    "category": item.get("category", "Unknown Category"),
                    "common_problems_solved": item.get("problem", ""),
                    "source_reference": f"{item.get('code', '')} - Clause {item.get('clause', '')}"
                },
                "full_text": f"{item.get('type', '')}. {item.get('data', '')}"
            }
            final_database.append(new_record)

    except Exception as e:
        print(f"[ERROR] Could not process {standards_path} → {e}")

    try:
        with open(interventions_path, "r", encoding="utf-8") as f:
            interventions_data = json.load(f)

        print(f"[OK] Loaded {len(interventions_data)} items from {interventions_path}")

        for item in interventions_data:
            content_text = (
                f"{item.get('description', '')}. "
                f"When to Apply: {item.get('when_to_apply', 'N/A')}. "
                f"Why it Works: {item.get('why_it_works', 'N/A')}. "
                f"Constraints: {item.get('constraints', 'N/A')}."
            )

            new_record = {
                "id": f"int-{item.get('id', uuid.uuid4())}",
                "intervention_name": item.get("intervention", "Unnamed Intervention"),
                "content": content_text,
                "metadata": {
                    "type": "Intervention",
                    "category": item.get("category", "General"),
                    "common_problems_solved": f"Safety improvement in {item.get('category', 'General')}",
                    "source_reference": item.get("source", "Unknown Source")
                },
                "full_text": f"{item.get('intervention', '')}. {content_text}"
            }

            final_database.append(new_record)

    except Exception as e:
        print(f"[ERROR] Could not process {interventions_path} → {e}")

    try:
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(final_database, f, ensure_ascii=False, indent=2)

        print(f"\n✅ SUCCESS — Saved {len(final_database)} total records to {output_path}")

    except Exception as e:
        print(f"[ERROR] Saving failed → {e}")


if __name__ == "__main__":
    build_knowledge_base(
        standards_path="standards.json",
        interventions_path="interventions.json",
        output_path="knowledge_base.json"
    )
