import pandas as pd

criminals_df = pd.read_csv("data/criminals.csv")
crimes_df = pd.read_csv("data/crimes.csv")


def get_most_wanted(limit=20):

    wanted = []

    for _, criminal in criminals_df.iterrows():

        criminal_id = criminal["criminal_id"]

        crimes = crimes_df[
            crimes_df["criminal_id"] == criminal_id
        ]

        total_crimes = len(crimes)

        gang_id = str(criminal["gang_id"])

        risk_score = min(total_crimes * 3, 70)

        if gang_id != "None" and gang_id != "nan":
              risk_score += 15

        if total_crimes >= 15:
             risk_score += 10
        risk_score = min(risk_score, 100)

        if risk_score >= 80:
            danger_level = "VERY HIGH"
        elif risk_score >= 60:
            danger_level = "HIGH"
        elif risk_score >= 30:
            danger_level = "MEDIUM"
        else:
            danger_level = "LOW"

        wanted.append({
            "criminal_id": criminal_id,
            "name": criminal["name"],
            "gang_id": gang_id,
            "risk_score": risk_score,
            "danger_level": danger_level,
            "total_crimes": total_crimes
        })

    wanted = sorted(
        wanted,
        key=lambda x: x["risk_score"],
        reverse=True
    )

    return wanted[:limit]


print(get_most_wanted(5))