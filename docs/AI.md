# KSP Crime Intelligence Hub — AI Features Documentation

## Overview
AI-powered features built for Karnataka Police using Groq LLM and Whisper STT.

---

## Feature 1 — Voice FIR Generator
**Endpoint:** POST /fir/generate
**Input:** Crime description in text
**Output:** Structured FIR with BNS sections

**Example Input:**
On 15 June at 9 PM, complainant Ravi Kumar reported 
motorcycle theft near Mysuru Bus Stand.

**Example Output:**
- FIR Number: AUTO-GENERATED
- Crime Type: Motor Vehicle Theft
- BNS Section: 379 IPC
- District: Mysuru
- Severity: Medium

---

## Feature 2 — Dialect AI Officer
**Endpoint:** POST /detect-dialect
**Input:** Text in any Karnataka language
**Output:** Language detected + English translation + Crime JSON

**Supported Languages:**
- Kannada
- Tulu
- Kodava
- Urdu
- Hindi-Kannada mix
- English

---

## Feature 3 — AI Investigator
**Endpoint:** POST /investigate
**Input:** Natural language question about crimes
**Output:** AI analysis with findings and recommendations

**Example Questions:**
- "Which district has highest crime rate?"
- "How many bike thefts in Mysuru this month?"
- "Show all robbery cases in Bengaluru"

---

## Feature 4 — Sketch AI Witness
**Endpoint:** POST /generate-sketch
**Input:** Witness description of suspect
**Output:** Structured suspect profile with missing details

---

## Feature 5 — Voice Transcription
**Endpoint:** POST /transcribe-voice
**Input:** Audio file (WAV format)
**Output:** Transcribed text in English

---

## Feature 6 — Voice to FIR Pipeline
**Endpoint:** POST /voice-to-fir
**Input:** Audio file of officer speaking
**Output:** Full FIR generated from voice

**Pipeline:**
1. Officer speaks → Audio recorded
2. Whisper AI → Speech to text
3. Groq LLM → Text to FIR
4. FIR ready in under 30 seconds!

---

## Tech Stack
- **LLM:** Groq (llama-3.3-70b-versatile)
- **STT:** Groq Whisper (whisper-large-v3)
- **Framework:** FastAPI
- **Language:** Python 3.13