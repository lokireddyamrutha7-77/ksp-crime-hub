import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
import pandas as pd


def get_spike_alerts():

    df = pd.read_csv(os.path.join(BASE_DIR, "data", "crimes.csv"))

    df["date"] = pd.to_datetime(df["date"])

    latest_date = df["date"].max()

    this_week = df[
        df["date"] >= latest_date - pd.Timedelta(days=7)
    ]

    last_week = df[
        (df["date"] >= latest_date - pd.Timedelta(days=14))
        &
        (df["date"] < latest_date - pd.Timedelta(days=7))
    ]

    alerts = []

    districts = sorted(df["district"].unique())

    for district in districts:

        current = len(
            this_week[
                this_week["district"] == district
            ]
        )

        previous = len(
            last_week[
                last_week["district"] == district
            ]
        )

        if previous == 0:
            continue

        increase = (
            (current - previous)
            / previous
        ) * 100

        if increase >= 30:

            if increase >= 70:
                severity = "CRITICAL"
            elif increase >= 50:
                severity = "WARNING"
            else:
                severity = "INFO"

            alerts.append(
                {
                    "district": district,
                    "last_week": previous,
                    "this_week": current,
                    "increase_percent": round(increase, 2),
                    "severity": severity,
                }
            )

    alerts.sort(
        key=lambda x: x["increase_percent"],
        reverse=True,
    )

    return alerts
def get_emerging_hotspots():

    from ml.crime_predictor import get_hotspot_predictions

    hotspots = get_hotspot_predictions()

    return hotspots[:5]

def get_crime_patterns():

    df = pd.read_csv(os.path.join(BASE_DIR, "data", "crimes.csv"))

    patterns = (
        df.groupby(
            [
                "district",
                "crime_type"
            ]
        )
        .size()
        .reset_index(name="count")
        .sort_values(
            "count",
            ascending=False
        )
    )

    alerts = []

    for _, row in patterns.head(10).iterrows():

        if row["count"] >= 50:
            severity = "CRITICAL"
        elif row["count"] >= 25:
            severity = "WARNING"
        else:
            severity = "INFO"

        alerts.append(
            {
                "district": row["district"],
                "crime_type": row["crime_type"],
                "count": int(row["count"]),
                "severity": severity
            }
        )

    return alerts