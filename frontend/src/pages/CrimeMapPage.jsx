import CrimeMapV2 from "../components/CrimeMapV2";
import DistrictPanel from "../components/DistrictPanel";
import StatCards from "../components/StatCards";

function CrimeMapPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Crime Intelligence Map</h1>

      <StatCards />

      <div
        style={{
          display: "flex",
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