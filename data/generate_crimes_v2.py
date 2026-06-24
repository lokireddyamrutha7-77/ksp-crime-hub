import pandas as pd
import random
from datetime import datetime, timedelta

from karnataka_locations import KARNATAKA_LOCATIONS


criminals_df = pd.read_csv("data/criminals.csv")


district_coords = {
    "Bengaluru Urban": (12.9716, 77.5946),
    "Bengaluru Rural": (13.1986, 77.4423),
    "Mysuru": (12.2958, 76.6394),
    "Mangaluru": (12.9141, 74.8560),
    "Hubballi-Dharwad": (15.3647, 75.1240),
    "Belagavi": (15.8497, 74.4977),
    "Kalaburagi": (17.3297, 76.8343),
    "Ballari": (15.1394, 76.9214),
    "Tumakuru": (13.3379, 77.1173),
    "Shivamogga": (13.9299, 75.5681),
    "Davangere": (14.4644, 75.9218),
    "Vijayapura": (16.8302, 75.7100),
    "Hassan": (13.0033, 76.1004),
    "Chikkamagaluru": (13.3161, 75.7720),
    "Udupi": (13.3409, 74.7421),
    "Kodagu": (12.3375, 75.8069),
    "Raichur": (16.2120, 77.3439),
    "Bidar": (17.9104, 77.5199),
    "Yadgir": (16.7710, 77.1383),
    "Koppal": (15.3508, 76.1547),
    "Gadag": (15.4165, 75.6322),
    "Haveri": (14.7960, 75.4005),
    "Uttara Kannada": (14.7862, 74.6943),
    "Dakshina Kannada": (12.8438, 75.2479),
    "Chitradurga": (14.2251, 76.3980),
    "Chikkaballapura": (13.4355, 77.7315),
    "Kolar": (13.1357, 78.1290),
    "Mandya": (12.5218, 76.8951),
    "Ramanagara": (12.7157, 77.2819),
    "Chamarajanagar": (11.9216, 76.9437)
}

crime_types = [
    "Theft",
    "Vehicle Theft",
    "Burglary",
    "Robbery",
    "Assault",
    "Murder",
    "Kidnapping",
    "Fraud",
    "Cybercrime",
    "Drug Offense",
    "Domestic Violence",
    "Chain Snatching",
    "Mobile Theft",
    "Land Dispute"
]

severities = ["low", "medium", "high"]
severity_weights = [0.50, 0.35, 0.15]

statuses = [
    "open",
    "closed",
    "investigating"
]

records = []

start_date = datetime(2023, 1, 1)

crime_counter = 1
for _, criminal in criminals_df.iterrows():

    criminal_id = criminal["criminal_id"]
    criminal_name = criminal["name"]
    gang_id = criminal["gang_id"]

    # Gang members commit more crimes
    if gang_id != "None":
        num_crimes = random.randint(5, 20)
    else:
        num_crimes = random.randint(1, 5)

    for _ in range(num_crimes):

        district = random.choice(
            list(KARNATAKA_LOCATIONS.keys())
        )

        city = random.choice(
            list(KARNATAKA_LOCATIONS[district].keys())
        )

        police_station = random.choice(
            KARNATAKA_LOCATIONS[district][city]
        )

        if police_station == "Rural PS":
            police_station = f"{city} Rural PS"

        elif police_station == "Town PS":
            police_station = f"{city} Town PS"

        elif police_station == "Traffic PS":
            police_station = f"{city} Traffic PS"

        base_lat, base_lng = district_coords[district]

        latitude = round(
            base_lat + random.uniform(-0.3, 0.3),
            6
        )

        longitude = round(
            base_lng + random.uniform(-0.3, 0.3),
            6
        )

        crime_date = start_date + timedelta(
            days=random.randint(0, 730)
        )

        records.append({

            "crime_id":
                f"CR{crime_counter:06d}",

            "criminal_id":
                criminal_id,

            "criminal_name":
                criminal_name,

            "gang_id":
                gang_id,

            "district":
                district,

            "city":
                city,

            "police_station":
                police_station,

            "crime_type":
                random.choice(crime_types),

            "latitude":
                latitude,

            "longitude":
                longitude,

            "date":
                crime_date.strftime("%Y-%m-%d"),

            "severity":
                random.choices(
                    severities,
                    severity_weights
                )[0],

            "status":
                random.choice(statuses)

        })

        crime_counter += 1

df = pd.DataFrame(records)

df.to_csv(
    "data/crimes.csv",
    index=False
)

print(
    f"Generated {len(df)} crime records successfully!"
)

print("\nTop Crime Types:")
print(df["crime_type"].value_counts().head(10))

print("\nTop Districts:")
print(df["district"].value_counts().head(10))

print("\nTotal Criminals Used:")
print(df["criminal_id"].nunique())