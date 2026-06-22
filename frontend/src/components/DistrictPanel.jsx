import { useEffect, useState } from "react";
import { getDistricts } from "../services/api";

function DistrictPanel() {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    getDistricts().then((data) => {
      setDistricts(data.districts);
    });
  }, []);

  return (
    <div
      style={{
        width: "300px",
        padding: "20px",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
        marginTop: "20px",
      }}
    >
      <h2>Karnataka Districts</h2>

      {districts.map((district) => (
        <p key={district}>{district}</p>
      ))}
    </div>
  );
}

export default DistrictPanel;