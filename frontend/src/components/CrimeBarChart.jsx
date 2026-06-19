import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const data = [
  { crime: "Fraud", cases: 120 },
  { crime: "Theft", cases: 90 },
  { crime: "Cybercrime", cases: 60 }
];

function CrimeBarChart() {
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