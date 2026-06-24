from neo4j import GraphDatabase
import pandas as pd

URI = "neo4j://localhost:7687"
USERNAME = "neo4j"
PASSWORD = "Ksp@12345"

driver = GraphDatabase.driver(
    URI,
    auth=(USERNAME, PASSWORD)
)


def get_criminals():
    with driver.session() as session:
        result = session.run("""
            MATCH (c:Criminal)
            RETURN c.name AS name,
                   c.age AS age,
                   c.district AS district,
                   c.crime AS crime
        """)

        return [dict(record) for record in result]
    
def get_network_graph():
    with driver.session() as session:

        nodes_result = session.run("""
            MATCH (c:Criminal)
            RETURN c.name AS id,
                   c.name AS name
        """)

        links_result = session.run("""
            MATCH (a:Criminal)-[:ASSOCIATED_WITH]->(b:Criminal)
            RETURN a.name AS source,
                   b.name AS target
        """)

        nodes = [dict(record) for record in nodes_result]
        links = [dict(record) for record in links_result]

        return {
            "nodes": nodes,
            "links": links
        }
    
def get_gangs():
    with driver.session() as session:

        result = session.run("""
            MATCH (c:Criminal)-[:BELONGS_TO]->(g:Gang)

            RETURN g.gang_id AS gang_id,
                   collect(c.name) AS members,
                   count(c) AS member_count

            ORDER BY member_count DESC
        """)

        return [dict(record) for record in result]
    
def get_criminal_details(criminal_id):

    with driver.session() as session:

        result = session.run("""
            MATCH (c:Criminal {criminal_id:$criminal_id})

            OPTIONAL MATCH (c)-[:BELONGS_TO]->(g:Gang)

            OPTIONAL MATCH
            (other:Criminal)-[:BELONGS_TO]->(g)

            WHERE other.criminal_id <> c.criminal_id

            RETURN
                c.criminal_id AS criminal_id,
                c.name AS name,
                c.age AS age,
                c.home_state AS home_state,
                c.home_district AS home_district,
                g.gang_id AS gang_id,
                collect(other.name) AS associates
        """,
        criminal_id=criminal_id)

        record = result.single()

        if not record:
            return None

        data = dict(record)

        crimes_df = pd.read_csv("data/crimes.csv")

        criminal_crimes = crimes_df[
            crimes_df["criminal_id"] == criminal_id
        ]

        total_crimes = len(criminal_crimes)

        crime_history = sorted(
            criminal_crimes["crime_type"]
            .dropna()
            .unique()
            .tolist()
        )

        risk_score = min(total_crimes * 5, 100)

        if data["gang_id"] is not None:
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

        active_status = (
            "Repeat Offender"
            if total_crimes >= 3
            else "First Time Offender"
        )

        data["total_crimes"] = total_crimes
        data["risk_score"] = risk_score
        data["danger_level"] = danger_level
        data["crime_history"] = crime_history
        data["active_status"] = active_status

        return data
    
def get_repeat_offenders():
    with driver.session() as session:
        result = session.run("""
            MATCH (c:Criminal)
            WHERE c.crime_count >= 3
            RETURN c.name AS name,
                   c.crime_count AS crime_count,
                   c.district AS district
        """)

        return [dict(record) for record in result]