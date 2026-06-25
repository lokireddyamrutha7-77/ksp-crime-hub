from sklearn.cluster import DBSCAN

def detect_hotspots(df):

    coords = df[['latitude', 'longitude']]

    model = DBSCAN(
        eps=0.05,
        min_samples=5
    )

    labels = model.fit_predict(coords)

    df['cluster'] = labels

    hotspots = []

    grouped = df[df['cluster'] != -1].groupby('cluster')

    for cluster_id, group in grouped:

        
        crime_count = len(group)

        if crime_count >= 10000:
            risk_level = "VERY HIGH"
        elif crime_count >= 5000:
            risk_level = "HIGH"
        elif crime_count >= 2000:
            risk_level = "MEDIUM"
        else:
            risk_level = "LOW"

        hotspots.append({
             "cluster_id": int(cluster_id),
             "crime_count": crime_count,
             "risk_level": risk_level,
             "center_lat": float(group['latitude'].mean()),
             "center_lon": float(group['longitude'].mean())
        })

    return hotspots
     
