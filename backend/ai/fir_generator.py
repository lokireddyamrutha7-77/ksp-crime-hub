import json
import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_fir(speech_text: str) -> dict:
    prompt = f"""
You are an AI assistant helping Karnataka Police generate FIR (First Information Report) data.

An officer has spoken the following:
"{speech_text}"

Extract all details and generate a structured FIR. Respond ONLY with a valid JSON object matching this schema exactly. Do not include markdown formatting wrappers or extra text.

{{
    "fir_number": "AUTO-GENERATED",
    "date_of_complaint": "<extract from speech or use today>",
    "time_of_incident": "<extract from speech>",
    "place_of_incident": "<extract from speech>",
    "complainant_name": "<extract if mentioned, else Unknown>",
    "crime_type": "<e.g. Motor Vehicle Theft, Robbery, Assault>",
    "crime_description": "<clean 2-3 sentence summary of the incident>",
    "accused_description": "<any description of accused if mentioned>",
    "witnesses": "<any witnesses mentioned>",
    "evidence": "<any evidence mentioned>",
    "bns_sections": ["<suggested BNS section 1>", "<section 2>"]
}}
"""

    try:
        chat_completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            temperature=0.1,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            response_format={"type": "json_object"}
        )

        response_content = chat_completion.choices[0].message.content

        return json.loads(response_content)

    except Exception as e:
        print(f"Error generating or parsing FIR: {e}")
        return {
            "error": "Failed to parse or generate structured FIR mapping.",
            "raw_message": str(e)
        }


if __name__ == "__main__":
    test_speech = (
        "Yesterday night around 9 PM near Majestic Metro station, "
        "my bike pulsar KA-01-E-1234 was stolen while I went to buy groceries. "
        "My name is Suresh."
    )

    print("--- Running Test with Groq JSON Extraction ---")

    result = generate_fir(test_speech)

    print(json.dumps(result, indent=4))