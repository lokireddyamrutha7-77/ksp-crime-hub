import os
from dotenv import load_dotenv
from groq import Groq
import psycopg2

load_dotenv("backend/.env")

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

schema = """
Table: crimes
Columns: id, district, crime_type, latitude, longitude, date, severity, status, created_at

Valid crime_type values: Assault, Burglary, Chain Snatching, Cybercrime, 
Domestic Violence, Drug Offense, Fraud, Kidnapping, Land Dispute, 
Mobile Theft, Murder, Robbery, Theft, Vehicle Theft

Valid status values: open, investigating, closed
Valid severity values: low, medium, high
"""

def get_db_connection():
    return psycopg2.connect(os.getenv("DATABASE_URL"))

def rows_to_text(rows, cursor):
    """Convert raw SQL rows into readable text with column names"""
    if not rows:
        return "No results found."
    
    # Get column names from cursor
    col_names = [desc[0] for desc in cursor.description]
    
    # Format each row as key: value pairs
    formatted = []
    for row in rows[:20]:  # limit to 20 rows
        row_text = ", ".join(
            f"{col_names[i]}: {row[i]}" 
            for i in range(len(col_names))
        )
        formatted.append(row_text)
    
    return "\n".join(formatted)

def investigate(question: str):
    # STEP 1 — Generate SQL
    sql_prompt = f"""
You are an expert PostgreSQL SQL generator for Karnataka Police crime database.

{schema}

Rules:
- Return ONLY the SQL query, no explanation, no markdown, no backticks
- Use ILIKE for string matching to handle case differences
- For "which district has most X" use GROUP BY district ORDER BY COUNT(*) DESC LIMIT 1
- For "how many" use SELECT COUNT(*)
- For "show all" use SELECT * with LIMIT 50
- Always use the exact table name: crimes
- For crime types use ILIKE, example: crime_type ILIKE 'Murder'
- For status use ILIKE, example: status ILIKE 'investigating'
- For severity use ILIKE, example: severity ILIKE 'high'

Question: {question}

SQL:"""

    sql_response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": sql_prompt}],
        temperature=0,
        max_tokens=200
    )

    sql = sql_response.choices[0].message.content.strip()
    sql = sql.replace("```sql", "").replace("```", "").strip()

    print(f"Generated SQL: {sql}")

    # STEP 2 — Execute SQL
    conn = None
    result_text = ""
    row_count = 0

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(sql)
        rows = cursor.fetchall()
        row_count = len(rows)

        print(f"Rows returned: {row_count}")

        # Convert rows to readable text WITH column names
        result_text = rows_to_text(rows, cursor)
        print(f"Formatted result: {result_text[:200]}")

        cursor.close()

    except Exception as e:
        print(f"Database error: {e}")
        return {
            "question": question,
            "answer": f"Database error: {str(e)}",
            "sql": sql
        }
    finally:
        if conn:
            conn.close()
    # Detect if question is in Kannada
        is_kannada = any(
            0x0C80 <= ord(char) <= 0x0CFF
            for char in question
        )
        if is_kannada:
            language_instruction = "Answer in Kannada language only."
        else:
            language_instruction = "Answer in English."
    # STEP 3 — Generate English Answer
    answer_prompt = f"""
You are a Karnataka Police crime analyst assistant.

The officer asked: "{question}"

The database returned {row_count} records. Here are the results:
{result_text}

Instructions:
- Answer SPECIFICALLY based on the data above
- Do NOT give a generic answer
- If results show district names, mention those specific districts
- If results show counts, mention those exact numbers
- If results show crime types, mention those specific types
- Keep answer under 3 sentences
- Be direct and factual
- If no data found, say "No matching records found in the database"
- {language_instruction}

Answer:"""

    answer_response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": answer_prompt}],
        temperature=0,
        max_tokens=300
    )

    answer = answer_response.choices[0].message.content.strip()

    return {
        "question": question,
        "answer": answer,
        "records_found": row_count,
        "sql_used": sql
    }