import { useState } from "react";
import CrimeMapPage from "./pages/CrimeMapPage";
import FIRGenerator from "./components/FIRGenerator";

function App() {
  const [currentPage, setCurrentPage] = useState("map");

  return (
    <div>
      {/* Navigation Bar */}
      <nav style={{
        backgroundColor: "#1a365d",
        padding: "12px 20px",
        display: "flex",
        gap: "20px",
        alignItems: "center"
      }}>
        <span style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "18px",
          marginRight: "20px"
        }}>
          🚔 KSP Crime Hub
        </span>
        <button
          onClick={() => setCurrentPage("map")}
          style={{
            padding: "8px 16px",
            backgroundColor: currentPage === "map" ? "#e53e3e" : "transparent",
            color: "white",
            border: "1px solid white",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          🗺️ Crime Map
        </button>
        <button
          onClick={() => setCurrentPage("fir")}
          style={{
            padding: "8px 16px",
            backgroundColor: currentPage === "fir" ? "#e53e3e" : "transparent",
            color: "white",
            border: "1px solid white",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          📋 FIR Generator
        </button>
      </nav>

      {/* Page Content */}
      {currentPage === "map" && <CrimeMapPage />}
      {currentPage === "fir" && <FIRGenerator />}
    </div>
  );
}

export default App;