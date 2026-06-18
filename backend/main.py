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

app = FastAPI(title="KSP Crime Intelligence Hub")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
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

# ─────────────────────────────────────
# Feature 2 — Dialect AI Officer
# ─────────────────────────────────────
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

# ─────────────────────────────────────
# Feature 3 — AI Investigator
# ─────────────────────────────────────
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

# ─────────────────────────────────────
# Feature 4 — Sketch AI Witness
# ─────────────────────────────────────
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