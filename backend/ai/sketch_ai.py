import json
import os
from groq import Groq
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_sketch(witness_description: str) -> dict:
    now = datetime.now().strftime("%d-%m-%Y %H:%M")
    prompt = f"""
You are an AI Forensic Sketch Assistant for Karnataka Police.

A witness has given this description of a suspect:
"{witness_description}"

Extract all physical features and create a detailed suspect profile.

Respond ONLY in this exact JSON format, no extra text, no markdown:

{{
  "witness_statement": "<original description>",
  "suspect_profile": {{
    "age_estimate": "<estimated age range e.g. 25-35 years>",
    "gender": "<Male/Female/Unknown>",
    "height": "<estimated height if mentioned, else Unknown>",
    "build": "<Thin/Medium/Heavy/Athletic or Unknown>",
    "skin_tone": "<Light/Medium/Dark or Unknown>",
    "face_shape": "<Oval/Round/Square/Long or Unknown>",
    "hair": "<color, length, style or Unknown>",
    "eyes": "<color, shape or Unknown>",
    "nose": "<shape description or Unknown>",
    "mouth_lips": "<description or Unknown>",
    "facial_hair": "<beard/mustache description or None>",
    "distinguishing_marks": "<scars, tattoos, birthmarks or None>",
    "clothing_last_seen": "<clothing description if mentioned or Unknown>",
    "language_spoken": "<if mentioned or Unknown>",
    "other_features": "<any other details mentioned>"
  }},
  "confidence_level": "<High/Medium/Low based on detail provided>",
  "missing_details": ["<detail 1 that witness should be asked>", "<detail 2>"],
  "summary": "<2 sentence suspect summary for officers on field>"
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
    profile = data["suspect_profile"]
    missing = "\n".join([f"  • {m}" for m in data["missing_details"]])
    formatted_report = f"""
╔══════════════════════════════════════════════════╗
        KARNATAKA STATE POLICE DEPARTMENT
         AI WITNESS SKETCH - SUSPECT PROFILE
╚══════════════════════════════════════════════════╝

DATE & TIME        : {now}
CONFIDENCE LEVEL   : {data['confidence_level']}

──────────────────────────────────────────────────
            WITNESS STATEMENT
──────────────────────────────────────────────────
"{data['witness_statement']}"

──────────────────────────────────────────────────
            SUSPECT PHYSICAL PROFILE
──────────────────────────────────────────────────
Age Estimate       : {profile['age_estimate']}
Gender             : {profile['gender']}
Height             : {profile['height']}
Build              : {profile['build']}
Skin Tone          : {profile['skin_tone']}

──────────────────────────────────────────────────
              FACIAL FEATURES
──────────────────────────────────────────────────
Face Shape         : {profile['face_shape']}
Hair               : {profile['hair']}
Eyes               : {profile['eyes']}
Nose               : {profile['nose']}
Mouth/Lips         : {profile['mouth_lips']}
Facial Hair        : {profile['facial_hair']}

──────────────────────────────────────────────────
           DISTINGUISHING MARKS
──────────────────────────────────────────────────
{profile['distinguishing_marks']}

──────────────────────────────────────────────────
         CLOTHING WHEN LAST SEEN
──────────────────────────────────────────────────
{profile['clothing_last_seen']}

──────────────────────────────────────────────────
SUMMARY FOR FIELD OFFICERS:
{data['summary']}

──────────────────────────────────────────────────
ADDITIONAL INFO NEEDED FROM WITNESS:
{missing}
──────────────────────────────────────────────────
PROCESSED BY       : KSP Sketch AI System
══════════════════════════════════════════════════
"""
    return {"structured_data": data, "formatted_report": formatted_report}