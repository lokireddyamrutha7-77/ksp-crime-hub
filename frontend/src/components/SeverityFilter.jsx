function SeverityFilter({
  severity,
  setSeverity
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px"
      }}
    >
      <button
        onClick={() => setSeverity("all")}
        style={{
          padding: "8px 15px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer"
        }}
      >
        All
      </button>

      <button
        onClick={() => setSeverity("high")}
        style={{
          padding: "8px 15px",
          borderRadius: "6px",
          border: "none",
          background: "#ff4d4d",
          color: "white",
          cursor: "pointer"
        }}
      >
        High
      </button>

      <button
        onClick={() => setSeverity("medium")}
        style={{
          padding: "8px 15px",
          borderRadius: "6px",
          border: "none",
          background: "#ffa500",
          color: "white",
          cursor: "pointer"
        }}
      >
        Medium
      </button>

      <button
        onClick={() => setSeverity("low")}
        style={{
          padding: "8px 15px",
          borderRadius: "6px",
          border: "none",
          background: "#ffd700",
          cursor: "pointer"
        }}
      >
        Low
      </button>
    </div>
  );
}

export default SeverityFilter;