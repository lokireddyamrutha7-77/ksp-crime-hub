import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

import { useEffect, useState } from "react";
import { getTrend } from "../services/api";

function TrendChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTrend().then((res) => {
      const months = [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
      ];

      const chartData = Object.entries(res).map(
        ([month, cases]) => ({
          month: months[Number(month) - 1],
          cases
        })
      );

      setData(chartData);
    });
  }, []);

  return (
    <LineChart width={500} height={250} data={data}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="cases" />
    </LineChart>
  );
}

export default TrendChart;