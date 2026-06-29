# KSP Crime Intelligence Hub API Documentation

## Base URL

```
http://127.0.0.1:8000
```

---

# Criminal APIs

## GET /

Description:
Returns project status.

Method:
GET

Example:
GET /

---

## GET /criminal/{criminal_id}

Description:
Returns a criminal profile.

Parameters:
- criminal_id

---

## GET /most-wanted

Description:
Returns most wanted criminals.

---

# Crime APIs

## GET /crimes

Description:
Returns all crime records.

---

## GET /crimes/district/{district}

Description:
Returns crimes for a district.

Parameter:
- district

---

## GET /crimes/filter

Description:
Filter crimes.

Query Parameters:
- district
- crime_type
- year
- month

---

## GET /districts

Description:
Returns all districts.

---

## GET /hotspots

Description:
Returns crime hotspot clusters.

---

## GET /stats

Description:
Returns complete statistics.

---

## GET /stats/summary

Description:
Returns summary statistics.

---

## GET /stats/trend

Description:
Returns crime trend.

---

## GET /risk/all

Description:
Returns district risk scores.

---

# Prediction APIs

## GET /predict/district

Description:
Predicts crime count.

Query Parameters

- district
- crime_type
- month

Example

```
/predict/district?district=Bengaluru Urban&crime_type=Theft&month=7
```

Response

```json
{
  "success": true,
  "district": "Bengaluru Urban",
  "crime_type": "Theft",
  "month": 7,
  "predicted_crime_count": 4.41
}
```

---

## GET /predict/hotspot

Description

Predicts next month's hotspot districts.

Response

```json
{
    "success": true,
    "forecast_month":"Next Month",
    "predicted_hotspots":[]
}
```

---

# Alert APIs

## GET /alerts/spikes

Description

Detects crime spikes.

Response

```json
{
   "success":true,
   "alerts":[]
}
```

---

## GET /alerts/emerging

Description

Returns emerging hotspots.

---

## GET /alerts/patterns

Description

Returns repeated crime patterns.

---

# Network APIs

## GET /network/criminals

Description

Returns all criminals.

---

## GET /network/graph

Description

Returns Neo4j graph nodes and relationships.

---

## GET /network/gangs

Description

Returns gang information.

---

## GET /network/criminal/{criminal_id}

Description

Returns detailed criminal network profile.

---

# AI APIs

## POST /generate-fir-text

Description

Generate FIR from text complaint.

Input

```json
{
 "complaint":"..."
}
```

---

## POST /fir/generate

Description

Generate structured FIR.

---

## POST /detect-dialect

Description

Detects language.

---

## POST /dialect/detect

Description

Detect dialect using ML.

---

## POST /investigate

Description

AI investigation assistant.

---

## POST /generate-sketch

Description

Generate suspect sketch.

---

## POST /transcribe-voice

Description

Speech to text.

---

## POST /transcribe-audio

Description

Audio transcription.

---

## POST /voice-to-fir

Description

Complete Voice → FIR pipeline.

---

# Status Codes

| Code | Meaning |
|------|---------|
|200|Success|
|400|Bad Request|
|404|Not Found|
|500|Internal Server Error|

---

# Technology Stack

- FastAPI
- Python
- Neo4j
- Pandas
- XGBoost
- Scikit-learn
- Whisper AI
- OpenAI/Claude
- React
- JavaScript

---

# Total APIs

**29 Endpoints**

- Criminal APIs
- Crime APIs
- Prediction APIs
- Alert APIs
- Network APIs
- AI APIs