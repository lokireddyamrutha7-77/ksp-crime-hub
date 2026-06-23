import json
import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_fir(speech_text: str) -> dict:
    prompt = f"""
You are an AI assistant helping Karnataka Police generate FIR drafts.
You are an expert in Bharatiya Nyaya Sanhita (BNS) 2023 sections.

Officer's statement:
"{speech_text}"

BNS Section Reference:
- Theft: BNS Section 303
- Murder: BNS Section 101
- Robbery: BNS Section 309
- Assault: BNS Section 115
- Chain Snatching: BNS Section 309
- Vehicle Theft: BNS Section 303
- Kidnapping: BNS Section 137
- Fraud/Cheating: BNS Section 318
- Cybercrime: IT Act Section 66
- Domestic Violence: BNS Section 85
- Rape: BNS Section 63
- Burglary: BNS Section 305
- Extortion: BNS Section 308
- Drug Trafficking: NDPS Act Section 20
- Eve Teasing: BNS Section 79

BNS Section Descriptions:
- BNS 303: Theft — punishment up to 3 years imprisonment
- BNS 101: Murder — punishment up to life imprisonment or death
- BNS 309: Robbery — punishment up to 10 years imprisonment
- BNS 115: Assault — punishment up to 1 year imprisonment
- BNS 137: Kidnapping — punishment up to 7 years imprisonment
- BNS 318: Cheating/Fraud — punishment up to 3 years imprisonment
- BNS 85: Domestic Violence — punishment up to 3 years imprisonment
- BNS 305: Burglary — punishment up to 3 years imprisonment
- BNS 308: Extortion — punishment up to 3 years imprisonment
- BNS 79: Eve Teasing — punishment up to 1 year imprisonment

Extract all details and generate a structured FIR.
Respond ONLY in this exact JSON format, no extra text, no markdown:

{{
  "fir_number": "AUTO-GENERATED",
  "date_of_complaint": "<extract from speech or use today>",
  "time_of_incident": "<extract from speech>",
  "place_of_incident": "<extract from speech>",
  "complainant_name": "<extract if mentioned, else Unknown>",
  "crime_type": "<e.g. Motor Vehicle Theft, Robbery, Assault>",
  "crime_description": "<clean 2-3 sentence summary>",
  "accused_description": "<any description of accused>",
  "witnesses": "<any witnesses mentioned>",
  "evidence": "<any evidence mentioned>",
  "bns_sections": [
    {{
      "section": "<BNS Section number>",
      "description": "<crime name>",
      "punishment": "<punishment details>",
      "confidence": "<High/Medium/Low>"
    }}
  ],
  "investigating_officer": "To be assigned",
  "district": "<extract district from speech>",
  "severity": "<Low/Medium/High>"
}}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": """You are an expert Karnataka Police FIR generator with deep knowledge of 
Bharatiya Nyaya Sanhita (BNS) 2023. Always suggest the most accurate BNS sections 
for each crime type. Include punishment details for each section."""
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

    fir_data = json.loads(response_text)
    return fir_data