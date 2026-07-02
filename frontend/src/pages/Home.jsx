function Home({ setCurrentPage }) {
  const pages = [
    { title: "🗺️ Crime Map", page: "map" },
    { title: "📋 FIR Generator", page: "fir" },
    { title: "🕸️ Network Analysis", page: "network" },
    { title: "📈 Risk Prediction", page: "risk" },
    { title: "🚨 Alerts", page: "alerts" },
    { title: "🤖 AI Investigator", page: "ai" },
    { title: "🎤 Voice FIR", page: "voice" },
    { title: "🌐 Dialect AI", page: "dialect" },
  ];

  return (
    <div
      style={{
        padding: "40px",
        background: "#f1f5f9",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          marginBottom: "10px",
        }}
      >
        🚔 KSP Crime Hub
      </h1>

      <p
        style={{
          fontSize: "20px",
          color: "#64748b",
          marginBottom: "35px",
        }}
      >
        AI Powered Crime Intelligence Dashboard
      </p>

      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        Quick Links
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        {pages.map((item) => (
          <div
            key={item.page}
            onClick={() => setCurrentPage(item.page)}
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
              cursor: "pointer",
              textAlign: "center",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.background = "#2563eb";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.background = "white";
              e.currentTarget.style.color = "black";
            }}
          >
            <h3>{item.title}</h3>
            <p>Open {item.title}</p>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "45px",
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h2>Project Overview</h2>

        <p style={{ lineHeight: "1.8" }}>
          KSP Crime Hub is an AI-powered crime intelligence platform
          developed to assist police officers in crime analysis,
          FIR generation, hotspot detection, AI investigation,
          dialect recognition, voice-based reporting, and real-time
          alerts through a single dashboard.
        </p>
      </div>
    </div>
  );
}

export default Home;