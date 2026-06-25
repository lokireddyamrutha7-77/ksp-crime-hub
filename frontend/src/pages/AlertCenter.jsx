import React, { useState } from "react";

function AlertCenter() {
  const [filter, setFilter] = useState("All");

  const alerts = [
    {
      id: 1,
      title: "Crime Spike Detected",
      district: "Bengaluru",
      type: "Spike",
      severity: "Critical",
    },
    {
      id: 2,
      title: "Vehicle Theft Increasing",
      district: "Mysuru",
      type: "Emerging",
      severity: "Warning",
    },
    {
      id: 3,
      title: "Cyber Fraud Pattern",
      district: "Mandya",
      type: "Pattern",
      severity: "Info",
    },
  ];

  const filteredAlerts =
    filter === "All"
      ? alerts
      : alerts.filter((alert) => alert.type === filter);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "#dc2626";
      case "Warning":
        return "#f97316";
      case "Info":
        return "#2563eb";
      default:
        return "#94a3b8";
    }
  };

  const buttonStyle = (value) => ({
    padding: "10px 18px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    background: filter === value ? "#0ea5e9" : "#e2e8f0",
    color: filter === value ? "white" : "#0f172a",
  });

  return (
    <div
      style={{
        padding: "25px",
        background: "#f1f5f9",
        minHeight: "100vh",
      }}
    >
      <h1>🚨 Alert Center</h1>

      <p
        style={{
          color: "#475569",
          marginBottom: "25px",
        }}
      >
        Monitor active crime alerts across Karnataka.
      </p>

      {/* Filter Buttons */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "25px",
          flexWrap: "wrap",
        }}
      >
        <button
          style={buttonStyle("All")}
          onClick={() => setFilter("All")}
        >
          All
        </button>

        <button
          style={buttonStyle("Spike")}
          onClick={() => setFilter("Spike")}
        >
          Spikes
        </button>

        <button
          style={buttonStyle("Emerging")}
          onClick={() => setFilter("Emerging")}
        >
          Emerging
        </button>

        <button
          style={buttonStyle("Pattern")}
          onClick={() => setFilter("Pattern")}
        >
          Patterns
        </button>
      </div>

      {/* Alert Cards */}

      {filteredAlerts.map((alert) => (
        <div
          key={alert.id}
          style={{
            background: "white",
            borderLeft: `8px solid ${getSeverityColor(
              alert.severity
            )}`,
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2>{alert.title}</h2>

          <p>
            <b>District:</b> {alert.district}
          </p>

          <p>
            <b>Alert Type:</b> {alert.type}
          </p>

          <p>
            <b>Severity:</b>

            <span
              style={{
                marginLeft: "10px",
                background: getSeverityColor(alert.severity),
                color: "white",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "13px",
              }}
            >
              {alert.severity}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default AlertCenter;