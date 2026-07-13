from groq import Groq

# Paste your Groq API key below
import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

query = input("Ask a crime question: ")

prompt = f"""
You are a Karnataka Police AI Investigator.

Convert the user's query into structured JSON.

Query:
{query}

Return ONLY valid JSON.

Format:
{{
  "intent": "",
  "district": "",
  "crime_type": "",
  "time_period": ""
}}
"""

response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {
            "role": "user",
            "content": prompt
        }
    ],
    temperature=0
)

print(response.choices[0].message.content)