import DistrictPanel from "../components/DistrictPanel";
import CrimeBarChart from "../components/CrimeBarChart";
import TrendChart from "../components/TrendChart";

function AnalyticsPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Crime Analytics</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "flex-start",
        }}
      >
        <DistrictPanel />
        <CrimeBarChart />
      </div>

      <div style={{ marginTop: "30px" }}>
        <TrendChart />
      </div>
    </div>
  );
}

export default AnalyticsPage;