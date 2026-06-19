import json
import os
import pandas as pd
from groq import Groq
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

df = pd.read_csv("data/crimes.csv")

REAL_CRIME_DATA = df.head(100).to_dict(orient="records")

def investigate(query: str) -> dict:
    now = datetime.now().strftime("%d-%m-%Y %H:%M")
    prompt = f"""
You are an AI Crime Intelligence Officer for Karnataka Police.

You have access to this crime database:
{json.dumps(REAL_CRIME_DATA, indent=2)}

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