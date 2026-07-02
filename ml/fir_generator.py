import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv("backend/.env")

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_fir(details: str):

    # Detect if input is in Kannada
    is_kannada = any(
        0x0C80 <= ord(char) <= 0x0CFF
        for char in details
    )

    # If Kannada input, translate to English first
    if is_kannada:
        translate_response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{
                "role": "user",
                "content": f"Translate this Kannada text to English. Return only the translation:\n{details}"
            }],
            temperature=0,
            max_tokens=300
        )
        details_english = translate_response.choices[0].message.content.strip()
    else:
        details_english = details

    # Generate FIR with BNS sections
    prompt = f"""
You are an expert Karnataka Police FIR writer.

Incident Details:
{details_english}

Generate a complete professional FIR with these sections:

1. FIR NUMBER: Auto-generate
2. DATE AND TIME: Extract from details or use today
3. PLACE OF OCCURRENCE: Extract from details
4. COMPLAINANT DETAILS: Extract from details
5. ACCUSED DETAILS: Unknown if not mentioned
6. CRIME CATEGORY: Identify the crime type
7. INCIDENT SUMMARY: Detailed description
8. BNS SECTIONS APPLICABLE:
   - For Theft: BNS Section 303 (Punishment up to 3 years)
   - For Murder: BNS Section 101 (Punishment up to life imprisonment)
   - For Robbery: BNS Section 309 (Punishment up to 10 years)
   - For Vehicle Theft: BNS Section 303 (Punishment up to 3 years)
   - For Assault: BNS Section 115 (Punishment up to 1 year)
   - For Fraud: BNS Section 318 (Punishment up to 7 years)
   - For Kidnapping: BNS Section 137 (Punishment up to 7 years)
   - For Cybercrime: BNS Section 316 (Punishment up to 3 years)
   - Apply the correct section based on the crime
9. INVESTIGATING OFFICER: To be assigned
10. STATUS: FIR Registered

Return the complete FIR in a professional format.
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0,
        max_tokens=1000
    )

    fir_text = response.choices[0].message.content.strip()

    return {
        "fir": fir_text,
        "input_language": "Kannada" if is_kannada else "English",
        "original_input": details,
        "success": True
    }