import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: "20px", flex: 1 }}>
        <h1>KSP Crime Intelligence Hub</h1>
<p>
  Real-time Crime Analytics and Hotspot Monitoring for Karnataka State Police
</p>
        <h2>Crime Overview Dashboard</h2>

        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div style={{ border: "1px solid gray", padding: "20px" }}>
            <h3>Total Crimes</h3>
            <p>12,450</p>
          </div>

          <div style={{ border: "1px solid gray", padding: "20px" }}>
  <h3>Districts Monitored</h3>
  <p>31</p>
</div>

<div style={{ border: "1px solid gray", padding: "20px" }}>
  <h3>Cities Monitored</h3>
  <p>120</p>
</div>

<div style={{ border: "1px solid gray", padding: "20px" }}>
  <h3>Police Stations</h3>
  <p>420</p>
</div>
        </div>
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
  <div style={{ border: "1px solid gray", padding: "20px" }}>
    <h3>Open Cases</h3>
    <p>1850</p>
  </div>

  <div style={{
  background: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
  minWidth: "180px"
}}>
    <h3>Closed Cases</h3>
    <p>2800</p>
  </div>

  <div style={{
  background: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
  minWidth: "180px"
}}>
    <h3>Investigating</h3>
    <p>350</p>
  </div>

  <div style={{
  background: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
  minWidth: "180px"
}}>
    <h3>High Risk Zones</h3>
    <p>12</p>
  </div>
</div>
      </div>
    </div>
  );
}

export default Dashboard;