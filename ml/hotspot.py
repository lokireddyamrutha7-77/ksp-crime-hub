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

        hotspots.append({
            "cluster_id": int(cluster_id),
            "crime_count": len(group),
            "center_lat": float(group['latitude'].mean()),
            "center_lon": float(group['longitude'].mean())
        })

    return hotspots
  
