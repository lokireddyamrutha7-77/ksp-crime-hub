function StatCards() {
  const cards = [
    {
      title: "Total Crimes",
      value: "10,000",
      icon: "🛡️",
      color: "#2563eb",
      growth: "+12.5%",
    },
    {
      title: "High Severity",
      value: "3,500",
      icon: "🚨",
      color: "#dc2626",
      growth: "+8.2%",
    },
    {
      title: "Open Cases",
      value: "1,200",
      icon: "📂",
      color: "#f97316",
      growth: "+5.4%",
    },
    {
      title: "Districts",
      value: "31",
      icon: "🏙️",
      color: "#7c3aed",
      growth: "Karnataka",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
        gap: "20px",
        marginBottom: "25px",
      }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          style={{
            background: "white",
            borderRadius: "18px",
            padding: "25px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
            transition: "0.3s",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <div
              style={{
                fontSize: "34px",
                color: card.color,
              }}
            >
              {card.icon}
            </div>

            <div>
              <div
                style={{
                  color: "#475569",
                  fontSize: "15px",
                }}
              >
                {card.title}
              </div>

              <h1
                style={{
                  margin: "8px 0",
                  color: card.color,
                }}
              >
                {card.value}
              </h1>

              <small
                style={{
                  color:
                    card.title === "Districts"
                      ? "#64748b"
                      : "#16a34a",
                  fontWeight: "600",
                }}
              >
                {card.title === "Districts"
                  ? card.growth
                  : `↑ ${card.growth} vs last month`}
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatCards;