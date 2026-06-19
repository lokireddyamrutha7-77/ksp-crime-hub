<<<<<<< HEAD
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys
import os
import tempfile

sys.path.append(os.path.dirname(__file__))
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from ai.fir_generator import generate_fir
from ai.dialect_ai import process_dialect
from ai.investigator import investigate
from ai.sketch_ai import generate_sketch
=======
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os
from dotenv import load_dotenv
import pandas as pd
from ml.hotspot import detect_hotspots
from pydantic import BaseModel

load_dotenv("backend/.env")

from backend.ai.fir_generator import generate_fir
from backend.ai.dialect_ai import process_dialect
from backend.ai.investigator import investigate
from backend.ai.sketch_ai import generate_sketch


>>>>>>> d7f32805e349d3c6ff17dd05884fe9ba338dbd42

app = FastAPI(title="KSP Crime Intelligence Hub")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
<<<<<<< HEAD
    allow_headers=["*"]
)

class TextInput(BaseModel):
    text: str

# ─────────────────────────────────────
# Root Route
# ─────────────────────────────────────
@app.get("/")
def root():
    return {"message": "KSP Crime Intelligence Hub API is running!"}

# ─────────────────────────────────────
# Feature 1 — Voice FIR Generator
# ─────────────────────────────────────
@app.post("/generate-fir-text")
def create_fir_from_text(data: TextInput):
    try:
        fir = generate_fir(data.text)
=======
    allow_headers=["*"],
)

SUPABASE_URL = "https://jumeyifobbsbeenrwhxu.supabase.co"
SUPABASE_KEY = "sb_publishable_BgPgAD6uL3xpTt-eQaM0Ww_gcgw6DY_"


HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json"
}

class TextInput(BaseModel):
    text: str


@app.get("/")
def root():
    return {"message": "KSP Crime Intelligence Hub API is running"}

@app.post("/generate-fir-text")
def create_fir_from_text(data: TextInput):

    try:
        fir = generate_fir(data.text)

>>>>>>> d7f32805e349d3c6ff17dd05884fe9ba338dbd42
        return {
            "success": True,
            "transcribed_text": data.text,
            "fir": fir
        }
<<<<<<< HEAD
=======

>>>>>>> d7f32805e349d3c6ff17dd05884fe9ba338dbd42
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
<<<<<<< HEAD

# ─────────────────────────────────────
# Feature 2 — Dialect AI Officer
# ─────────────────────────────────────
=======
>>>>>>> d7f32805e349d3c6ff17dd05884fe9ba338dbd42
@app.post("/detect-dialect")
def detect_dialect(data: TextInput):
    try:
        result = process_dialect(data.text)
<<<<<<< HEAD
=======

>>>>>>> d7f32805e349d3c6ff17dd05884fe9ba338dbd42
        return {
            "success": True,
            "structured_data": result["structured_data"],
            "formatted_report": result["formatted_report"]
        }
<<<<<<< HEAD
=======

>>>>>>> d7f32805e349d3c6ff17dd05884fe9ba338dbd42
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
<<<<<<< HEAD

# ─────────────────────────────────────
# Feature 3 — AI Investigator
# ─────────────────────────────────────
=======
>>>>>>> d7f32805e349d3c6ff17dd05884fe9ba338dbd42
@app.post("/investigate")
def ai_investigator(data: TextInput):
    try:
        result = investigate(data.text)
<<<<<<< HEAD
=======

>>>>>>> d7f32805e349d3c6ff17dd05884fe9ba338dbd42
        return {
            "success": True,
            "structured_data": result["structured_data"],
            "formatted_report": result["formatted_report"]
        }
<<<<<<< HEAD
=======

>>>>>>> d7f32805e349d3c6ff17dd05884fe9ba338dbd42
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

<<<<<<< HEAD
# ─────────────────────────────────────
# Feature 4 — Sketch AI Witness
# ─────────────────────────────────────
=======
>>>>>>> d7f32805e349d3c6ff17dd05884fe9ba338dbd42
@app.post("/generate-sketch")
def sketch_ai(data: TextInput):
    try:
        result = generate_sketch(data.text)
<<<<<<< HEAD
=======

>>>>>>> d7f32805e349d3c6ff17dd05884fe9ba338dbd42
        return {
            "success": True,
            "structured_data": result["structured_data"],
            "formatted_report": result["formatted_report"]
        }
<<<<<<< HEAD
=======

>>>>>>> d7f32805e349d3c6ff17dd05884fe9ba338dbd42
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

<<<<<<< HEAD
# ─────────────────────────────────────
# Feature 5 — Voice Transcription
# ─────────────────────────────────────
@app.post("/transcribe-voice")
async def transcribe_voice(audio: UploadFile = File(...)):
    try:
        from ai.whisper_test import transcribe_audio
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
            tmp.write(await audio.read())
            tmp_path = tmp.name
        text = transcribe_audio(tmp_path)
        os.unlink(tmp_path)
        return {
            "success": True,
            "transcribed_text": text
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
        # ─────────────────────────────────────
# Feature 6 — FIR Generate Route
# ─────────────────────────────────────
@app.post("/fir/generate")
def fir_generate(data: TextInput):
    try:
        fir = generate_fir(data.text)
        return {
            "success": True,
            "transcribed_text": data.text,
            "fir": fir
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
    
=======
@app.get("/crimes")
async def get_crimes():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{SUPABASE_URL}/rest/v1/crimes?select=*",
            headers=HEADERS
        )
        return response.json()

@app.get("/crimes/district/{district}")
async def get_crimes_by_district(district: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{SUPABASE_URL}/rest/v1/crimes?district=eq.{district}&select=*",
            headers=HEADERS
        )
        return response.json()

@app.get("/districts")
async def get_districts():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{SUPABASE_URL}/rest/v1/crimes?select=district",
            headers=HEADERS
        )
        data = response.json()
        districts = list(set([r["district"] for r in data]))
        return {"districts": sorted(districts)}
@app.get("/hotspots")
def get_hotspots():

    df = pd.read_csv("data/crimes.csv")

    return detect_hotspots(df)

@app.get("/stats")
def get_stats():

    df = pd.read_csv("data/crimes.csv")

    return {
        "total_crimes": len(df),
        "crime_types": df["crime_type"].value_counts().to_dict(),
        "districts": df["district"].value_counts().to_dict(),
        "severity": df["severity"].value_counts().to_dict(),
        "status": df["status"].value_counts().to_dict()
    }

@app.get("/stats/summary")
def get_stats_summary():

    df = pd.read_csv("data/crimes.csv")

    top_districts = (
        df["district"]
        .value_counts()
        .head(5)
        .to_dict()
    )

    top_crime_types = (
        df["crime_type"]
        .value_counts()
        .head(5)
        .to_dict()
    )

    return {
        "total_crimes": len(df),
        "top_districts": top_districts,
        "top_crime_types": top_crime_types
    }

@app.get("/stats/trend")
def get_crime_trend():

    df = pd.read_csv("data/crimes.csv")

    df["date"] = pd.to_datetime(df["date"])

    trend = (
        df.groupby(df["date"].dt.month)
        .size()
        .to_dict()
    )

    return trend

@app.get("/risk")
def get_risk_scores():

    df = pd.read_csv("data/crimes.csv")

    district_counts = df.groupby("district").size()

    max_count = district_counts.max()

    result = []

    for district, count in district_counts.items():

        score = round((count / max_count) * 100)

        result.append({
            "district": district,
            "crime_count": int(count),
            "risk_score": score
        })

    return result
>>>>>>> d7f32805e349d3c6ff17dd05884fe9ba338dbd42
