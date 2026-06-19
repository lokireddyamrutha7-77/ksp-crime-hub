import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const data = [
  { month: "Jan", cases: 100 },
  { month: "Feb", cases: 140 },
  { month: "Mar", cases: 170 },
  { month: "Apr", cases: 220 }
];

function TrendChart() {
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