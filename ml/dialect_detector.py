import json
import os
from groq import Groq
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def detect_dialect(text: str) -> dict:
    now = datetime.now().strftime("%d-%m-%Y %H:%M")

    prompt = f"""
You are an AI language detection assistant for Karnataka Police.

Analyze this text and detect the language:
"{text}"

Karnataka languages you must detect:
- Kannada
- Tulu
- Kodava
- Urdu
- Hindi-Kannada mix
- English

Then translate to English and extract crime information.

Respond ONLY in this exact JSON format, no extra text, no markdown:

{{
  "original_text": "<original text>",
  "detected_language": "<Kannada/Tulu/Kodava/Urdu/Hindi-Kannada/English>",
  "confidence": "<High/Medium/Low>",
  "translated_text": "<English translation>",
  "crime_info": {{
    "crime_type": "<type of crime if mentioned>",
    "location": "<location if mentioned>",
    "district": "<Karnataka district if mentioned>",
    "time": "<time if mentioned>",
    "suspect_description": "<any suspect details>",
    "summary": "<one line summary in English>"
  }}
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

    data = json.loads(response_text)

    formatted_report = f"""
╔══════════════════════════════════════════════════╗
        KARNATAKA STATE POLICE DEPARTMENT
          DIALECT DETECTION REPORT
╚══════════════════════════════════════════════════╝

DATE & TIME        : {now}
DETECTED LANGUAGE  : {data['detected_language']}
CONFIDENCE         : {data['confidence']}

──────────────────────────────────────────────────
ORIGINAL TEXT ({data['detected_language']}):
"{data['original_text']}"

ENGLISH TRANSLATION:
"{data['translated_text']}"

──────────────────────────────────────────────────
              EXTRACTED CRIME INFO
──────────────────────────────────────────────────
Crime Type         : {data['crime_info']['crime_type']}
Location           : {data['crime_info']['location']}
District           : {data['crime_info']['district']}
Time               : {data['crime_info']['time']}
Suspect            : {data['crime_info']['suspect_description']}

SUMMARY: {data['crime_info']['summary']}
──────────────────────────────────────────────────
PROCESSED BY       : KSP Dialect AI System
══════════════════════════════════════════════════
"""

    return {
        "structured_data": data,
        "formatted_report": formatted_report
    }