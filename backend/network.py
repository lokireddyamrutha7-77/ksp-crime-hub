from neo4j import GraphDatabase

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