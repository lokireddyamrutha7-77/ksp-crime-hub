import pandas as pd
from neo4j import GraphDatabase

URI = "bolt://127.0.0.1:7687"
USERNAME = "neo4j"
PASSWORD = "Ksp@12345"

driver = GraphDatabase.driver(
    URI,
    auth=(USERNAME, PASSWORD)
)

df = pd.read_csv("data/criminals.csv")

with driver.session() as session:

    for _, row in df.iterrows():

        gang_id = str(row["gang_id"])

        # Create Criminal Node
        session.run("""
            MERGE (c:Criminal {criminal_id:$criminal_id})
            SET c.name = $name,
                c.age = $age,
                c.home_state = $home_state,
                c.home_district = $home_district,
                c.gang_id = $gang_id
        """,
        criminal_id=row["criminal_id"],
        name=row["name"],
        age=int(row["age"]),
        home_state=row["home_state"],
        home_district=row["home_district"],
        gang_id=gang_id
        )

        # Create Gang Node + Relationship
        if gang_id != "None" and gang_id != "nan":

            session.run("""
                MATCH (c:Criminal {criminal_id:$criminal_id})

                MERGE (g:Gang {gang_id:$gang_id})

                MERGE (c)-[:BELONGS_TO]->(g)
            """,
            criminal_id=row["criminal_id"],
            gang_id=gang_id
            )

driver.close()

print("Criminals and gangs imported successfully")