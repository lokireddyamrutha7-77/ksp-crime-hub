import pandas as pd

def calculate_risk_scores(df):

    district_counts = df.groupby("district").size()

    max_count = district_counts.max()

    result = []

    for district, count in district_counts.items():

        score = int((count / max_count) * 100)

        result.append({
            "district": district,
            "crime_count": int(count),
            "risk_score": score
        })

    return result