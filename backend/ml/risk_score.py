import pandas as pd

def calculate_risk_scores(df):

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

        risk_score = int((score / max_score) * 100)

        result.append({
            "district": district,
            "weighted_score": int(score),
            "risk_score": risk_score
        })

    return sorted(
        result,
        key=lambda x: x["risk_score"],
        reverse=True
    )