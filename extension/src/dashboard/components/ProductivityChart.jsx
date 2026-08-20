import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import useAnalytics from "../../hooks/useAnalytics";

function ProductivityChart() {
  const sessions = useAnalytics();

  const data = sessions.map((session) => ({
    day: session.createdDate,
    score: Math.round(session.productivity),
  }));

  return (
    <div className="card">
      <h3>📈 Productivity Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis domain={[0, 100]} />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#f85a0e"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProductivityChart;