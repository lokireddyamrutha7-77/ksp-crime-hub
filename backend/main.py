from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os
from dotenv import load_dotenv
import pandas as pd
from ml.hotspot import detect_hotspots

load_dotenv()

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

@app.get("/")
def root():
    return {"message": "KSP Crime Intelligence Hub API is running"}

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