import { useState } from "react";
import CrimeMapV2 from "../components/CrimeMapV2";
import DistrictPanel from "../components/DistrictPanel";
import StatCards from "../components/StatCards";
import CrimeFilter from "../components/CrimeFilter";
import SeverityFilter from "../components/SeverityFilter";

function CrimeMapPage() {
  const [crimeType, setCrimeType] = useState("All");
  const [severity, setSeverity] = useState("all");

  return (
    <div
  style={{
    padding: "20px",
    background: "#f1f5f9",
    minHeight: "100vh",
  }}
>
      <h1>Crime Intelligence Map</h1>

      <StatCards />

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
          flexWrap: "wrap"
        }}
      >
        <CrimeFilter
          selected={crimeType}
          setSelected={setCrimeType}
        />

        <SeverityFilter
          severity={severity}
          setSeverity={setSeverity}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          alignItems: "flex-start"
        }}
      >
        <div style={{ flex: 1 }}>
          <CrimeMapV2 />
        </div>

        <DistrictPanel />
      </div>

      {/* Charts will be enabled when backend is connected */}

      {/*
      <div
        style={{
          display: "flex",
          gap: "30px",
          marginTop: "30px",
          flexWrap: "wrap"
        }}
      >
        <CrimeBarChart />
        <TrendChart />
      </div>
      */}
    </div>
  );
}

export default CrimeMapPage;