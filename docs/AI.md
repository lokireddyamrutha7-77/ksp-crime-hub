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
- ---

## 10 Sample Questions for Judges

### Crime Analysis Questions:
1. "Which district has the most murders?"
2. "Which crime type is most common in Bengaluru?"
3. "Show theft trend in Mysuru"
4. "Which districts are high risk for robbery?"
5. "How many vehicle thefts happened in June?"

### Pattern Detection Questions:
6. "Which areas have most chain snatching cases?"
7. "What time of day do most crimes happen?"
8. "Which district has lowest crime rate?"
9. "How many cases are still open?"
10. "Which crime type increased most this month?"
 ---

## Kannada Demo Script (3 questions for judges)

### Demo Question 1:
ಯಾವ ಜಿಲ್ಲೆಯಲ್ಲಿ ಅತಿ ಹೆಚ್ಚು ಕಳ್ಳತನ ಆಗಿದೆ?
(Which district has most theft?)

### Demo Question 2:
ಬೆಂಗಳೂರಿನಲ್ಲಿ ಯಾವ ಅಪರಾಧ ಹೆಚ್ಚಾಗಿ ನಡೆಯುತ್ತದೆ?
(Which crime is most common in Bengaluru?)

### Demo Question 3:
ವಾಹನ ಕಳ್ಳತನ ಎಲ್ಲಿ ಹೆಚ್ಚು ನಡೆಯುತ್�ದೆ?
(Where do most vehicle thefts happen?)
---

## 5 Language Demo Sentences (for judges)

### 1. Kannada:
ಇಲ್ಲಿ ಬೈಕ್ ಕಳ್ಳತನ ಆಯಿತು, ಮೈಸೂರು ಬಸ್ ನಿಲ್ದಾಣದ ಬಳಿ
(Bike theft happened here, near Mysuru Bus Stand)

### 2. Tulu:
Ikala oru bike kalatanad, police ku report maadond
(Today one bike was stolen, reporting to police)

### 3. Urdu:
یہاں ایک موٹرسائیکل چوری ہوئی ہے، مجرم فرار ہو گیا
(A motorcycle was stolen here, criminal escaped)

### 4. Hindi-Kannada mix:
Yahan ek bike chori hui, Mysuru mein raat ko
(A bike was stolen here, in Mysuru at night)

### 5. English:
Bike theft reported near Mysuru Bus Stand at 9 PM