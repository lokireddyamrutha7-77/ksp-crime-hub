import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: "20px", flex: 1 }}>
        <h1>KSP Crime Intelligence Hub</h1>

        <h2>Crime Overview Dashboard</h2>

        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div style={{ border: "1px solid gray", padding: "20px" }}>
            <h3>Total Crimes</h3>
            <p>12,450</p>
          </div>

          <div style={{ border: "1px solid gray", padding: "20px" }}>
            <h3>Hotspot Districts</h3>
            <p>5</p>
          </div>

          <div style={{ border: "1px solid gray", padding: "20px" }}>
            <h3>High Risk Criminals</h3>
            <p>127</p>
          </div>

          <div style={{ border: "1px solid gray", padding: "20px" }}>
            <h3>Active Alerts</h3>
            <p>18</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;