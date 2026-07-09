import pandas as pd


criminals_df = pd.read_csv("data/criminals.csv")
crimes_df = pd.read_csv("data/crimes.csv")


def get_criminal_profile(criminal_id):

    criminal = criminals_df[
        criminals_df["criminal_id"] == criminal_id
    ]

    if criminal.empty:
        return {"error": "Criminal not found"}

    criminal = criminal.iloc[0]

    crimes = crimes_df[
        crimes_df["criminal_id"] == criminal_id
    ]

    total_crimes = len(crimes)

    crime_history = sorted(
        crimes["crime_type"].unique().tolist()
    )

    risk_score = 0

    risk_score += min(total_crimes * 4, 60)

    if criminal["gang_id"] != "None":
        risk_score += 15

    serious_crimes = [
        "Murder",
        "Kidnapping",
        "Drug Offense"
    ]

    if any(
        crime in crime_history
        for crime in serious_crimes
    ):
        risk_score += 15

    risk_score = min(risk_score, 100)

    if risk_score >= 80:
        danger_level = "VERY HIGH"
    elif risk_score >= 60:
        danger_level = "HIGH"
    elif risk_score >= 30:
        danger_level = "MEDIUM"
    else:
        danger_level = "LOW"

    if total_crimes >= 5:
        active_status = "Repeat Offender"
    else:
        active_status = "Occasional Offender"

    profile = {

        "criminal_id":
            criminal["criminal_id"],

        "name":
            criminal["name"],

        "age":
            int(criminal["age"]),

        "home_state":
            criminal["home_state"],

        "home_district":
            criminal["home_district"],

        "gang_id":
            criminal["gang_id"],

        "total_crimes":
            total_crimes,

        "risk_score":
            risk_score,

        "danger_level":
            danger_level,

        "crime_history":
            crime_history,

        "active_status":
            active_status
    }

    return profile
print(get_criminal_profile("C0001"))