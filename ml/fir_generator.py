from groq import Groq

client = Groq(
    api_key="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"
)

def generate_fir(details):
    prompt = f"""
    Generate a professional police FIR.

    Incident Details:
    {details}

    Include:
    - Date
    - Location
    - Crime Category
    - Complaint Summary
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content


incident = """
Motorcycle stolen near Mysuru Bus Stand on 15 June at 9 PM.
"""

print(generate_fir(incident))