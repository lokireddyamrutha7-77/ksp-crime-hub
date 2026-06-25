import pandas as pd
import joblib

from sklearn.preprocessing import LabelEncoder
from xgboost import XGBRegressor

MODEL_PATH = "ml/model.pkl"
DISTRICT_ENCODER_PATH = "ml/district_encoder.pkl"
CRIME_ENCODER_PATH = "ml/crime_encoder.pkl"


def train_model():

    df = pd.read_csv("data/crimes.csv")

    df["date"] = pd.to_datetime(df["date"])
    df["month"] = df["date"].dt.month

    district_encoder = LabelEncoder()
    df["district_encoded"] = district_encoder.fit_transform(
        df["district"]
    )

    crime_encoder = LabelEncoder()
    df["crime_encoded"] = crime_encoder.fit_transform(
        df["crime_type"]
    )

    X = df[
        [
            "district_encoded",
            "crime_encoded",
            "month"
        ]
    ]

    y = df.groupby(
        [
            "district_encoded",
            "crime_encoded",
            "month"
        ]
    ).cumcount() + 1

    model = XGBRegressor(
        n_estimators=100,
        max_depth=5,
        learning_rate=0.1,
        random_state=42
    )

    model.fit(X, y)

    joblib.dump(model, MODEL_PATH)
    joblib.dump(
        district_encoder,
        DISTRICT_ENCODER_PATH
    )
    joblib.dump(
        crime_encoder,
        CRIME_ENCODER_PATH
    )

    print("Model trained successfully")


def predict_crime_count(
    district,
    crime_type,
    month
):

    model = joblib.load(MODEL_PATH)

    district_encoder = joblib.load(
        DISTRICT_ENCODER_PATH
    )

    crime_encoder = joblib.load(
        CRIME_ENCODER_PATH
    )

    district_encoded = district_encoder.transform(
        [district]
    )[0]

    crime_encoded = crime_encoder.transform(
        [crime_type]
    )[0]

    prediction = model.predict([
        [
            district_encoded,
            crime_encoded,
            month
        ]
    ])

    return float(prediction[0])


def get_hotspot_predictions():

    df = pd.read_csv("data/crimes.csv")

    districts = sorted(
        df["district"].unique()
    )

    crime_type = "Theft"

    current_month = (
        pd.Timestamp.now().month
    )

    next_month = (
        current_month % 12
    ) + 1

    hotspots = []

    for district in districts:

        try:

            prediction = predict_crime_count(
                district,
                crime_type,
                next_month
            )

            if prediction >= 10:
                risk = "VERY HIGH"
            elif prediction >= 7:
                risk = "HIGH"
            elif prediction >= 4:
                risk = "MEDIUM"
            else:
                risk = "LOW"

            hotspots.append({
                "district": district,
                "forecast_crimes": round(
                    prediction,
                    2
                ),
                "risk_level": risk
            })

        except Exception:
            pass

    hotspots = sorted(
        hotspots,
        key=lambda x: x["forecast_crimes"],
        reverse=True
    )

    return hotspots[:5]


if __name__ == "__main__":
    train_model()