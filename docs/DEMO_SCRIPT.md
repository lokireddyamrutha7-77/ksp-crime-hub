# KSP Crime Intelligence Hub — Judge Demo Script
## Team CrimeZero | Datathon 2026

---

## Total Demo Time: 8 minutes

---

## Introduction (30 seconds)
"Namaskara! We are Team CrimeZero.
Karnataka Police officers waste 45 minutes writing one FIR manually.
Our system does it in 30 seconds using AI.
We built 7 AI features that solve real Karnataka Police problems.
Let us show you."

---

## Demo 1 — Voice FIR Generator (2 minutes)
**What to say:**
"An officer speaks about a crime in Kannada or English.
Our AI listens, understands, and generates a complete FIR instantly."

**What to show:**
1. Go to: http://127.0.0.1:8000/docs
2. Click POST /fir/generate
3. Click Try it out
4. Paste this:
"On 20 June at 9 PM, complainant Ravi Kumar reported
motorcycle theft near Mysuru Bus Stand.
Red Honda Activa KA-09-1234 was stolen by two unknown persons."
5. Click Execute
6. Show the FIR output to judges

**What to say after:**
"See — FIR number, crime type, BNS sections,
district, severity — all generated in 3 seconds!
This saves Karnataka Police 45 minutes per case."

---

## Demo 2 — Dialect AI Officer (2 minutes)
**What to say:**
"Karnataka has 5 different languages.
Officers and citizens don't always speak standard Kannada.
Our AI understands ALL Karnataka languages."

**What to show:**
1. Click POST /detect-dialect
2. Click Try it out
3. Paste Kannada text:
ದಿನಾಂಕ 20 ಜೂನ್ ರಾತ್ರಿ 8 ಗಂಟೆಗೆ ಬೆಂಗಳೂರು ಸಿಟಿ ಮಾರ್ಕೆಟ್ ಬಳಿ ಚಿನ್ನದ ಸರ ಕಸಿದುಕೊಂಡರು
4. Click Execute
5. Show: Language detected = Kannada, Translation, Crime type

**What to say after:**
"Kannada detected with High confidence!
Automatically translated to English.
Crime type extracted — Chain Snatching!
This works for Tulu, Urdu, Hindi-Kannada mix too!"

---

## Demo 3 — AI Investigator (2 minutes)
**What to say:**
"Judges can ask any crime question in plain language.
Our AI searches 5000 real Karnataka crime records
and gives instant intelligence."

**What to show:**
1. Click POST /investigate
2. Click Try it out
3. Paste:
{"text": "Which district has the most murders?"}
4. Click Execute
5. Show: District names, findings, recommendations

**What to say after:**
"Mysuru and Yadgir have most murders!
AI gives specific numbers, findings, and recommendations.
No SQL queries needed — just plain English!"

---

## Demo 4 — Sketch AI Witness (1 minute)
**What to say:**
"Witness describes suspect in any language.
AI creates complete suspect profile instantly."

**What to show:**
1. Click POST /generate-sketch
2. Paste:
{"text": "Medium beard, oval face, scar on left cheek,
around 30 years old, dark skin, blue shirt, tall"}
3. Show the structured suspect profile

---

## Closing (30 seconds)
"We built 7 AI features in 15 days:
✅ Voice FIR Generator
✅ Dialect AI Officer
✅ AI Investigator
✅ Sketch AI Witness
✅ Voice Transcription
✅ Voice to FIR Pipeline
✅ BNS Section Auto-Detection

All features work with Karnataka's 5 languages.
Time saved per FIR: 45 minutes → 30 seconds.
Thank you! We are Team CrimeZero."

---

## Emergency Backup
If internet is slow, use these pre-tested inputs:
- FIR: "Bike theft near Mysuru Bus Stand"
- Dialect: ಇಲ್ಲಿ ಬೈಕ್ ಕಳ್ಳತನ ಆಯಿತು
- Investigate: "Which district has most theft?"
- Sketch: "Tall man, black shirt, beard, scar on face"