function StatCards() {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          minWidth: "150px",
        }}
      >
        <h3>Total Crimes</h3>
        <h2>10000</h2>
      </div>

      <div
        style={{
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          minWidth: "150px",
        }}
      >
        <h3>High Severity</h3>
        <h2>3500</h2>
      </div>

      <div
        style={{
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          minWidth: "150px",
        }}
      >
        <h3>Open Cases</h3>
        <h2>1200</h2>
      </div>

      <div
        style={{
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          minWidth: "150px",
        }}
      >
        <h3>Districts</h3>
        <h2>31</h2>
      </div>
    </div>
  );
}

export default StatCards;