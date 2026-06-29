
function DistrictPanel() {
  return (
    <div
      style={{
        width: "350px",
        maxWidth: "320px",
        background: "white",
        borderRadius: "18px",
        padding: "25px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ marginBottom: "25px" }}>
        📊 Crime Statistics
      </h2>

      <div style={{ marginBottom: "20px" }}>
        <b>🚨 Critical Alerts</b>
        <h3 style={{ color: "#dc2626" }}>8</h3>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <b>📋 Pending FIRs</b>
        <h3 style={{ color: "#2563eb" }}>126</h3>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <b>👤 Repeat Offenders</b>
        <h3 style={{ color: "#9333ea" }}>21</h3>
      </div>

      <div>
        <b>🔍 Active Investigations</b>
        <h3 style={{ color: "#16a34a" }}>43</h3>
      </div>
    </div>
  );
}

export default DistrictPanel;