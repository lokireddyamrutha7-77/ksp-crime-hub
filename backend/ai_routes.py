
from fastapi import APIRouter
from groq import Groq

router = APIRouter()

import os
from dotenv import load_dotenv
load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))
@router.post("/investigate")
def investigate(data: dict):

    query = data.get("query", "")

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": f"""
You are a Karnataka Police AI Investigator.

Convert the query into JSON.

Query:
{query}

Return only JSON.
"""
            }
        ]
    )

    return {
        "result": response.choices[0].message.content
    }