import json
import os
import pandas as pd
from groq import Groq
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
df = pd.read_csv(os.path.join(BASE_DIR, "data", "crimes.csv"))
REAL_CRIME_DATA = df.head(100).to_dict(orient="records")

def investigate(query: str) -> dict:
    now = datetime.now().strftime("%d-%m-%Y %H:%M")
    prompt = f"""
You are an expert AI Crime Intelligence Analyst for Karnataka State Police (KSP).
You have been given access to real crime data from Karnataka districts.

Your role:
- Analyze crime patterns accurately
- Give specific district names and numbers
- Provide actionable intelligence to police officers
- Always base answers on the provided data

Crime Database (100 real records):
{json.dumps(REAL_CRIME_DATA, indent=2)}

Officer's Question:
"{query}"

Instructions:
1. Read the question carefully
2. Search through ALL records in the database
3. Count accurately - don't guess
4. Give specific district names with numbers
5. Make recommendations based on data

Respond ONLY in this exact JSON format, no extra text, no markdown:

{{
  "query": "<the original question>",
  "answer": "<specific direct answer with numbers and district names>",
  "findings": [
    "<specific finding 1 with numbers>",
    "<specific finding 2 with numbers>",
    "<specific finding 3 with numbers>"
  ],
  "total_cases": "<exact number of relevant cases found>",
  "high_risk_districts": ["<district 1>", "<district 2>"],
  "recommendation": "<specific actionable recommendation for Karnataka Police>",
  "severity_level": "<Low / Medium / High>"
}}
"""
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are an expert AI Crime Intelligence Analyst for Karnataka State Police. Always analyze data carefully and give accurate answers with specific numbers and district names."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )
    response_text = response.choices[0].message.content.strip()
    if response_text.startswith("```"):
        response_text = response_text.split("```")[1]
        if response_text.startswith("json"):
            response_text = response_text[4:]
    data = json.loads(response_text)
    findings_text = "\n".join([f"  • {f}" for f in data['findings']])
    high_risk = ", ".join(data['high_risk_districts'])
    formatted_report = f"""
╔══════════════════════════════════════════════════╗
        KARNATAKA STATE POLICE DEPARTMENT
          AI CRIME INVESTIGATOR REPORT
╚══════════════════════════════════════════════════╝

DATE & TIME        : {now}
QUERY              : {data['query']}

──────────────────────────────────────────────────
                    ANSWER
──────────────────────────────────────────────────
{data['answer']}

──────────────────────────────────────────────────
                KEY FINDINGS
──────────────────────────────────────────────────
{findings_text}

──────────────────────────────────────────────────
TOTAL CASES FOUND  : {data['total_cases']}
HIGH RISK DISTRICTS: {high_risk}
SEVERITY LEVEL     : {data['severity_level']}

──────────────────────────────────────────────────
RECOMMENDATION:
{data['recommendation']}
──────────────────────────────────────────────────
PROCESSED BY       : KSP AI Investigator System
══════════════════════════════════════════════════
"""
    return {"structured_data": data, "formatted_report": formatted_report}