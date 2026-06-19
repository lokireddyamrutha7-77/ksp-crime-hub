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
    return {"message": "KSP Crime Intelligence Hub API is running"}

@app.post("/generate-fir-text")
def create_fir_from_text(data: TextInput):

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
@app.post("/detect-dialect")
def detect_dialect(data: TextInput):
    try:
        result = process_dialect(data.text)

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
@app.post("/investigate")
def ai_investigator(data: TextInput):
    try:
        result = investigate(data.text)

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

@app.post("/generate-sketch")
def sketch_ai(data: TextInput):
    try:
        result = generate_sketch(data.text)

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