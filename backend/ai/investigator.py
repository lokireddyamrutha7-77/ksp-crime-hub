import json
import os
<<<<<<< HEAD
=======
import pandas as pd
>>>>>>> d7f32805e349d3c6ff17dd05884fe9ba338dbd42
from groq import Groq
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

<<<<<<< HEAD
SAMPLE_CRIME_DATA = [
    {"district": "Mysuru", "crime_type": "Vehicle Theft", "date": "2026-06-15", "severity": "Medium", "location": "Mysuru Bus Stand"},
    {"district": "Mysuru", "crime_type": "Vehicle Theft", "date": "2026-06-14", "severity": "Medium", "location": "Mysuru City"},
    {"district": "Bengaluru", "crime_type": "Robbery", "date": "2026-06-15", "severity": "High", "location": "MG Road"},
    {"district": "Bengaluru", "crime_type": "Assault", "date": "2026-06-13", "severity": "High", "location": "Koramangala"},
    {"district": "Bengaluru", "crime_type": "Vehicle Theft", "date": "2026-06-12", "severity": "Medium", "location": "Whitefield"},
    {"district": "Mangaluru", "crime_type": "Robbery", "date": "2026-06-11", "severity": "High", "location": "City Market"},
    {"district": "Hubballi", "crime_type": "Assault", "date": "2026-06-10", "severity": "Medium", "location": "Old Town"},
    {"district": "Mysuru", "crime_type": "Robbery", "date": "2026-06-09", "severity": "High", "location": "Mysuru Palace"},
    {"district": "Bengaluru", "crime_type": "Vehicle Theft", "date": "2026-06-08", "severity": "Low", "location": "Indiranagar"},
    {"district": "Belagavi", "crime_type": "Assault", "date": "2026-06-07", "severity": "Medium", "location": "Market Area"},
]
=======
df = pd.read_csv("data/crimes.csv")

REAL_CRIME_DATA = df.head(100).to_dict(orient="records")
>>>>>>> d7f32805e349d3c6ff17dd05884fe9ba338dbd42

def investigate(query: str) -> dict:
    now = datetime.now().strftime("%d-%m-%Y %H:%M")
    prompt = f"""
You are an AI Crime Intelligence Officer for Karnataka Police.

You have access to this crime database:
<<<<<<< HEAD
{json.dumps(SAMPLE_CRIME_DATA, indent=2)}
=======
{json.dumps(REAL_CRIME_DATA, indent=2)}
>>>>>>> d7f32805e349d3c6ff17dd05884fe9ba338dbd42

An officer has asked this question:
"{query}"

Analyze the data and answer the question completely.

Respond ONLY in this exact JSON format, no extra text, no markdown:

{{
  "query": "<the original question>",
  "answer": "<direct answer to the question>",
  "findings": [
    "<finding 1>",
    "<finding 2>",
    "<finding 3>"
  ],
  "total_cases": "<number of relevant cases found>",
  "high_risk_districts": ["<district 1>", "<district 2>"],
  "recommendation": "<one actionable recommendation for police>",
  "severity_level": "<Low / Medium / High>"
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