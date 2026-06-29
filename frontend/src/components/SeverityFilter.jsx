function SeverityFilter({ severity, setSeverity }) {
  const buttonStyle = (type, bgColor, textColor = "white") => ({
    padding: "0 22px",
    height: "42px",
    minWidth: "82px",
    borderRadius: "10px",
    border:
      severity === type
        ? "2px solid #1d4ed8"
        : "1px solid #d1d5db",
    background:
      severity === type ? bgColor : "#ffffff",
    color:
      severity === type ? textColor : "#374151",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    transition: "0.25s",
    boxShadow:
      severity === type
        ? "0 4px 12px rgba(0,0,0,0.12)"
        : "0 2px 6px rgba(0,0,0,0.05)",
  });

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        alignItems: "center",
      }}
    >
      <button
        onClick={() => setSeverity("all")}
        style={buttonStyle("all", "#f8fafc", "#111827")}
      >
        All
      </button>

      <button
        onClick={() => setSeverity("high")}
        style={buttonStyle("high", "#ef4444")}
      >
        High
      </button>

      <button
        onClick={() => setSeverity("medium")}
        style={buttonStyle("medium", "#f59e0b")}
      >
        Medium
      </button>

      <button
        onClick={() => setSeverity("low")}
        style={buttonStyle("low", "#facc15", "#111827")}
      >
        Low
      </button>
    </div>
  );
}

export default SeverityFilter;