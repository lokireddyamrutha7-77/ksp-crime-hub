import json
import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_fir(speech_text: str) -> dict:
    prompt = f"""
You are an AI assistant helping Karnataka Police generate FIR (First Information Report) drafts.

An officer has spoken the following:
"{speech_text}"

Extract all details and generate a structured FIR. Respond ONLY in this exact JSON format, no extra text, no markdown:

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
  "bns_sections": ["<suggested BNS section 1>", "<section 2>"],
  "investigating_officer": "To be assigned",
  "district": "<extract district/area from speech>",
  "severity": "<Low / Medium / High based on crime type>"
}}
"""
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )
    response_text = response.choices[0].message.content.strip()
    if response_text.startswith("```"):
        response_text = response_text.split("```")[1]
        if response_text.startswith("json"):
            response_text = response_text[4:]
    fir_data = json.loads(response_text)
    return fir_data