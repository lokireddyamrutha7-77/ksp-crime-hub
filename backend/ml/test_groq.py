from groq import Groq

# Paste your Groq API key below
client = Groq(
    api_key="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"
)

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