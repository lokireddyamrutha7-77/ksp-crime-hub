from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
import sys
import tempfile
import pandas as pd
from dotenv import load_dotenv
from backend.network import get_criminals, get_network_graph


sys.path.append(os.path.dirname(__file__))
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

load_dotenv()

from ai.fir_generator import generate_fir
from ai.dialect_ai import process_dialect
from ai.investigator import investigate
from ai.sketch_ai import generate_sketch
from ml.hotspot import detect_hotspots

from backend.ai.whisper_ai import transcribe_audio
from ml.dialect_detector import detect_dialect as ml_detect_dialect

load_dotenv("backend/.env")




app = FastAPI(title="KSP Crime Intelligence Hub")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
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
    return {"message": "KSP Crime Intelligence Hub API is running!"}

@app.post("/generate-fir-text")
def create_fir_from_text(data: TextInput):
    try:
        fir = generate_fir(data.text)
        return {"success": True, "transcribed_text": data.text, "fir": fir}
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.post("/detect-dialect")
def detect_dialect(data: TextInput):
    try:
        result = process_dialect(data.text)
        return {"success": True, "structured_data": result["structured_data"], "formatted_report": result["formatted_report"]}
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.post("/investigate")
def ai_investigator(data: TextInput):
    try:
        result = investigate(data.text)
        return {"success": True, "structured_data": result["structured_data"], "formatted_report": result["formatted_report"]}
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.post("/generate-sketch")
def sketch_ai(data: TextInput):
    try:
        result = generate_sketch(data.text)
        return {"success": True, "structured_data": result["structured_data"], "formatted_report": result["formatted_report"]}
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.post("/fir/generate")
def fir_generate(data: TextInput):
    try:
        fir = generate_fir(data.text)
        return {"success": True, "transcribed_text": data.text, "fir": fir}
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.post("/transcribe-voice")
async def transcribe_voice(audio: UploadFile = File(...)):
    try:
        from ai.whisper_test import transcribe_audio
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
            tmp.write(await audio.read())
            tmp_path = tmp.name
        text = transcribe_audio(tmp_path)
        os.unlink(tmp_path)
        return {"success": True, "transcribed_text": text}
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.post("/voice-to-fir")
async def voice_to_fir(audio: UploadFile = File(...)):
    try:
        from ai.whisper_test import transcribe_audio
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
            tmp.write(await audio.read())
            tmp_path = tmp.name
        transcribed_text = transcribe_audio(tmp_path)
        os.unlink(tmp_path)
        fir = generate_fir(transcribed_text)
        return {"success": True, "transcribed_text": transcribed_text, "fir": fir}
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.post("/transcribe-audio")
async def transcribe_audio_route(file: UploadFile = File(...)):
    import tempfile

    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_file:
        temp_file.write(await file.read())
        temp_path = temp_file.name

    text = transcribe_audio(temp_path)

    return {
        "success": True,
        "transcribed_text": text
    }

from fastapi import Query

@app.get("/crimes")
async def get_crimes(
    page: int = Query(1, ge=1),
    limit: int = Query(100, ge=1, le=500)
):
    try:
        start = (page - 1) * limit
        end = start + limit - 1

        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{SUPABASE_URL}/rest/v1/crimes?select=*",
                headers={
                    **HEADERS,
                    "Range": f"{start}-{end}"
                }
            )

            return {
                "success": True,
                "page": page,
                "limit": limit,
                "data": response.json()
            }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
    
@app.get("/crimes/district/{district}")
async def get_crimes_by_district(district: str):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{SUPABASE_URL}/rest/v1/crimes?district=eq.{district}&select=*",
                headers=HEADERS
            )

            return {
                "success": True,
                "data": response.json()
            }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

@app.get("/crimes/filter")
async def filter_crimes(
    crime_type: str = None,
    district: str = None,
    severity: str = None,
    start_date: str = None,
    end_date: str = None
):
    try:
        query = f"{SUPABASE_URL}/rest/v1/crimes?select=*"

        if crime_type:
            query += f"&crime_type=eq.{crime_type}"

        if district:
            query += f"&district=eq.{district}"

        if severity:
            query += f"&severity=eq.{severity}"

        if start_date:
            query += f"&date=gte.{start_date}"

        if end_date:
            query += f"&date=lte.{end_date}"

        async with httpx.AsyncClient() as client:
            response = await client.get(query, headers=HEADERS)

            return {
                "success": True,
                "data": response.json()
            }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

@app.get("/districts")
async def get_districts():
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{SUPABASE_URL}/rest/v1/crimes?select=district",
                headers=HEADERS
            )

            data = response.json()
            districts = list(set([r["district"] for r in data]))

            return {
                "success": True,
                "districts": sorted(districts)
            }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

@app.get("/hotspots")
def get_hotspots():
    try:
        df = pd.read_csv("data/crimes.csv")

        return {
            "success": True,
            "data": detect_hotspots(df)
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
    
@app.get("/stats")
def get_stats():
    try:
        df = pd.read_csv("data/crimes.csv")

        return {
            "success": True,
            "total_crimes": len(df),
            "crime_types": df["crime_type"].value_counts().to_dict(),
            "districts": df["district"].value_counts().to_dict(),
            "severity": df["severity"].value_counts().to_dict(),
            "status": df["status"].value_counts().to_dict()
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

@app.get("/stats/summary")
def get_stats_summary():
    try:
        df = pd.read_csv("data/crimes.csv")

        top_districts = df["district"].value_counts().head(5).to_dict()
        top_crime_types = df["crime_type"].value_counts().head(5).to_dict()
        severity_breakdown = df["severity"].value_counts().to_dict()

        return {
            "success": True,
            "total_crimes": len(df),
            "top_districts": top_districts,
            "top_crime_types": top_crime_types,
            "severity_breakdown": severity_breakdown
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

@app.get("/stats/trend")
def get_crime_trend():
    try:
        df = pd.read_csv("data/crimes.csv")

        df["date"] = pd.to_datetime(df["date"])

        trend = df.groupby(df["date"].dt.month).size().to_dict()

        return {
            "success": True,
            "data": trend
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
    
@app.get("/risk/all")
def get_risk_scores():
    try:
        df = pd.read_csv("data/crimes.csv")

        severity_weights = {
            "low": 1,
            "medium": 2,
            "high": 3
        }

        df["weight"] = df["severity"].str.lower().map(severity_weights)

        district_scores = df.groupby("district")["weight"].sum()

        max_score = district_scores.max()

        result = []

        for district, score in district_scores.items():
            risk_score = round((score / max_score) * 100)

            result.append({
                "district": district,
                "weighted_score": int(score),
                "risk_score": risk_score
            })

        return {
            "success": True,
            "data": sorted(result, key=lambda x: x["risk_score"], reverse=True)
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

@app.post("/dialect/detect")
def dialect_detect(data: TextInput):
    try:
        result = ml_detect_dialect(data.text)
        return {
            "success": True,
            "structured_data": result["structured_data"],
            "formatted_report": result["formatted_report"]
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
@app.get("/network/criminals")
def get_network_criminals():
    return get_criminals()

@app.get("/network/graph")
def get_network_graph_api():
    return get_network_graph()