import { useEffect, useState } from "react";
import { getStats } from "../services/api";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats().then((data) => {
      setStats(data);
    });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: "20px", flex: 1 }}>
        <h1>KSP Crime Intelligence Hub</h1>

        <p>
          Real-time Crime Analytics and Hotspot Monitoring for Karnataka State Police
        </p>

        <h2>Crime Overview Dashboard</h2>

        <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>

          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
              minWidth: "180px"
            }}
          >
            <h3>Total Crimes</h3>
            <p>{stats?.total_crimes || 0}</p>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
              minWidth: "180px"
            }}
          >
            <h3>Districts Monitored</h3>
            <p>{Object.keys(stats?.districts || {}).length}</p>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
              minWidth: "180px"
            }}
          >
            <h3>Cities Monitored</h3>
            <p>90</p>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
              minWidth: "180px"
            }}
          >
            <h3>Police Stations</h3>
            <p>420</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>

          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
              minWidth: "180px"
            }}
          >
            <h3>Open Cases</h3>
            <p>{stats?.status?.open || 0}</p>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
              minWidth: "180px"
            }}
          >
            <h3>Closed Cases</h3>
            <p>{stats?.status?.closed || 0}</p>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
              minWidth: "180px"
            }}
          >
            <h3>Investigating</h3>
            <p>{stats?.status?.investigating || 0}</p>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
              minWidth: "180px"
            }}
          >
            <h3>High Severity Crimes</h3>
            <p>{stats?.severity?.high || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;