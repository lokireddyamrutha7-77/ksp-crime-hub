from groq import Groq

# Paste your Groq API key below
import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {
            "role": "user",
            "content": "Generate a short FIR for a motorcycle theft in Mysuru."
        }
    ]
)

print(response.choices[0].message.content)