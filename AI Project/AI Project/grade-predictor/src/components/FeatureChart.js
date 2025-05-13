import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function FeatureChart({ title, features, impacts }) {
  const data = features.map((f, i) => ({ feature: f, impact: impacts[i] }));
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-2">{title} - Feature Impact</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical" margin={{ left: 40 }}>
          <XAxis type="number" />
          <YAxis type="category" dataKey="feature" />
          <Tooltip />
          <Bar dataKey="impact" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
