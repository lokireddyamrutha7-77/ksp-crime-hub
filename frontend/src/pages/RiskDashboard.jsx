import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

function RiskDashboard() {
  const districtData = [
    { district: "Bengaluru", risk: 95 },
    { district: "Mysuru", risk: 82 },
    { district: "Mandya", risk: 76 },
    { district: "Udupi", risk: 65 },
    { district: "Shivamogga", risk: 58 },
  ];

  const forecastData = [
    { week: "Week 1", cases: 120 },
    { week: "Week 2", cases: 145 },
    { week: "Week 3", cases: 170 },
    { week: "Week 4", cases: 190 },
  ];

  return (
    <div
      style={{
        padding: "25px",
        background: "#f1f5f9",
        minHeight: "100vh",
      }}
    >
      <h1>Risk Prediction Dashboard</h1>

      <p
        style={{
          color: "#475569",
          marginBottom: "25px",
        }}
      >
        Crime forecasting and district risk analysis
      </p>

      {/* Summary Cards */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "25px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            minWidth: "220px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Total Districts</h3>
          <h2>31</h2>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            minWidth: "220px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h3>High Risk Areas</h3>
          <h2>8</h2>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            minWidth: "220px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Predicted Cases</h3>
          <h2>1240</h2>
        </div>
      </div>

      {/* Bar Chart + Top Districts */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2>District Risk Scores</h2>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={districtData}>
              <XAxis dataKey="district" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="risk"
                fill="#ef4444"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2>Top 5 High Risk Districts</h2>

          <div style={{ marginTop: "20px" }}>
            <p><b>1. Bengaluru</b> 🔺 95</p>
            <p><b>2. Mysuru</b> 🔺 82</p>
            <p><b>3. Mandya</b> ➖ 76</p>
            <p><b>4. Udupi</b> 🔻 65</p>
            <p><b>5. Shivamogga</b> 🔻 58</p>
          </div>
        </div>
      </div>

      {/* Forecast Chart */}

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "16px",
          marginTop: "25px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h2>Next Month Crime Forecast</h2>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={forecastData}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="cases"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Heat Map */}

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "16px",
          marginTop: "25px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h2>Karnataka Risk Heat Map</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            textAlign: "center",
fontWeight: "600",
fontSize: "16px",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <div style={{background:"#dc2626",color:"white",padding:"15px",borderRadius:"10px"}}>
            Bengaluru
          </div>

          <div style={{background:"#ef4444",color:"white",padding:"15px",borderRadius:"10px"}}>
            Mysuru
          </div>

          <div style={{background:"#f97316",color:"white",padding:"15px",borderRadius:"10px"}}>
            Mandya
          </div>

          <div style={{background:"#eab308",color:"white",padding:"15px",borderRadius:"10px"}}>
            Udupi
          </div>

          <div style={{background:"#22c55e",color:"white",padding:"15px",borderRadius:"10px"}}>
            Shivamogga
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiskDashboard;