import { useState, useEffect } from "react";
import CrimeMapPage from "./pages/CrimeMapPage";
import FIRGenerator from "./components/FIRGenerator";
import NetworkGraphPage from "./pages/NetworkGraphPage";

function App() {
  const [currentPage, setCurrentPage] = useState("map");
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isDragging, setIsDragging] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const newWidth = Math.min(
        Math.max(e.clientX, 180),
        400
      );

      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
      window.removeEventListener(
        "mouseup",
        handleMouseUp
      );
    };
  }, [isDragging]);

  const menuButtonStyle = (page) => ({
    width: "100%",
    padding: "14px",
    background:
      currentPage === page ? "#0ea5e9" : "transparent",
    color: "white",
    border: "none",
    borderRadius: "10px",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "12px",
  });

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f1f5f9",
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          position: "fixed",
          top: "12px",
          left: sidebarOpen
            ? sidebarWidth + 10
            : 10,
          zIndex: 999,
          width: "24px",
          height: "24px",
          border: "none",
          borderRadius: "4px",
          background: "#0ea5e9",
          color: "white",
          cursor: "pointer",
          fontSize: "12px",
          transition: "0.3s",
        }}
      >
        {sidebarOpen ? "❮" : "❯"}
      </button>

      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen
            ? `${sidebarWidth}px`
            : "0px",
          overflow: "hidden",
          transition: "0.3s",
          background: "#1e293b",
          padding: sidebarOpen ? "20px" : "0px",
          color: "white",
          boxShadow:
            "2px 0px 15px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            fontSize: "20px",
            marginBottom: "25px",
            paddingBottom: "15px",
            borderBottom: "1px solid #334155",
            whiteSpace: "nowrap",
          }}
        >
          🚔 KSP Crime Hub
        </h1>

        <button
          style={menuButtonStyle("map")}
          onClick={() => setCurrentPage("map")}
        >
          🗺️ Crime Map
        </button>

        <button
          style={menuButtonStyle("fir")}
          onClick={() => setCurrentPage("fir")}
        >
          📋 FIR Generator
        </button>

        <button
          style={menuButtonStyle("network")}
          onClick={() => setCurrentPage("network")}
        >
          🕸️ Network Analysis
        </button>

        <div
          style={{
            marginTop: "40px",
            background: "#0f172a",
            padding: "18px",
            borderRadius: "12px",
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>
            System Status
          </h3>

          <p>🟢 Backend Online</p>
          <p>🟢 Network Module</p>
          <p>🟢 Crime Analytics</p>
        </div>
      </div>

      {/* Resize Handle */}
      {sidebarOpen && (
        <div
          onMouseDown={() => setIsDragging(true)}
          style={{
            width: "5px",
            cursor: "col-resize",
            background: "#334155",
          }}
        />
      )}

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        {currentPage === "map" && <CrimeMapPage />}
        {currentPage === "fir" && <FIRGenerator />}
        {currentPage === "network" && (
          <NetworkGraphPage />
        )}
      </div>
    </div>
  );
}

export default App;