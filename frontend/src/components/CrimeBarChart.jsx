import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

import { useEffect, useState } from "react";
import { getSummary } from "../services/api";

function CrimeBarChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getSummary().then((res) => {
      const chartData = Object.entries(
        res.top_crime_types
      ).map(([crime, cases]) => ({
        crime,
        cases
      }));

      setData(chartData);
    });
  }, []);

  return (
    <BarChart width={400} height={250} data={data}>
      <XAxis dataKey="crime" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="cases" />
    </BarChart>
  );
}

export default CrimeBarChart;