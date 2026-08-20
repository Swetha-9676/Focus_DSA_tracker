import useAnalytics from "../../hooks/useAnalytics";

function WeeklySummary() {
  const sessions = useAnalytics();

  const totalStudyTime = sessions.reduce(
    (sum, s) => sum + (s.focusTime || 0),
    0
  );

  const problemsSolved = sessions.length;

  const avgProductivity =
    sessions.length > 0
      ? Math.round(
          sessions.reduce(
            (sum, s) => sum + (s.productivity || 0),
            0
          ) / sessions.length
        )
      : 0;

  const avgConfidence =
    sessions.length > 0
      ? Math.round(
          sessions.reduce(
            (sum, s) => sum + (s.confidence || 0),
            0
          ) / sessions.length
        )
      : 0;

  const stats = [
    {
      title: "Study Time",
      value: `${Math.floor(totalStudyTime / 60)} hrs`,
      icon: "⏱",
    },
    {
      title: "Problems Solved",
      value: problemsSolved,
      icon: "🧩",
    },
    {
      title: "Avg Productivity",
      value: `${avgProductivity}%`,
      icon: "📈",
    },
    {
      title: "Avg Confidence",
      value: `${avgConfidence}%`,
      icon: "🎯",
    },
  ];

  return (
    <div className="card">
      <h3>📊 Weekly Summary</h3>

      <div className="weekly-grid">
        {stats.map((item, index) => (
          <div key={index} className="summary-card">
            <h4>
              {item.icon} {item.title}
            </h4>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklySummary;