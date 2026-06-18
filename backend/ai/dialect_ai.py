import json
import os
from groq import Groq
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def process_dialect(text: str) -> dict:
    prompt = f"""
You are an AI assistant for Karnataka Police that understands multiple languages spoken in Karnataka including Kannada, Tulu, Kodava, Urdu, Hindi-Kannada mix, and English.

An officer or citizen has said the following:
"{text}"

Do these 3 things:
1. Detect the language
2. Translate it to English
3. Extract crime information

Respond ONLY in this exact JSON format, no extra text, no markdown:

{{
  "original_text": "<the original text as given>",
  "detected_language": "<Kannada / Tulu / Kodava / Urdu / Hindi-Kannada / English>",
  "translated_text": "<English translation>",
  "crime_type": "<type of crime mentioned>",
  "location": "<location mentioned or Unknown>",
  "district": "<district in Karnataka if mentioned or Unknown>",
  "time": "<time mentioned or Unknown>",
  "count": "<number of incidents if mentioned or 1>",
  "summary": "<one line summary in English>"
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
    now = datetime.now().strftime("%d-%m-%Y %H:%M")
    formatted_report = f"""
╔══════════════════════════════════════════════════╗
        KARNATAKA STATE POLICE DEPARTMENT
          DIALECT AI - CRIME REPORT
╚══════════════════════════════════════════════════╝

DATE & TIME        : {now}

ORIGINAL STATEMENT ({data['detected_language']}):
"{data['original_text']}"

DETECTED LANGUAGE  : {data['detected_language']}
ENGLISH TRANSLATION: "{data['translated_text']}"

──────────────────────────────────────────────────
              EXTRACTED CRIME INFORMATION
──────────────────────────────────────────────────

Crime Type         : {data['crime_type']}
Number of Cases    : {data['count']}
Location           : {data['location']}
District           : {data['district']}
Time of Incident   : {data['time']}

──────────────────────────────────────────────────
SUMMARY : {data['summary']}
──────────────────────────────────────────────────
STATUS             : Forwarded for FIR Registration
PROCESSED BY       : KSP Dialect AI System
══════════════════════════════════════════════════
"""
    return {"structured_data": data, "formatted_report": formatted_report}