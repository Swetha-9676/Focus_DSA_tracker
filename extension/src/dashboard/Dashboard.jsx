import "./dashboard.css";
import useSessionData from "../hooks/useSessionData";
import ScoreCard from "./components/ScoreCard";
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  if (mins === 0) return `${secs} sec`;

  return `${mins} min ${secs} sec`;
}
function Dashboard() {
  const session = useSessionData();

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">
  🧠 FOCUS Smart DSA Study Tracker
</h1>

<p className="subtitle">
  Analyze your DSA learning behavior.
</p>

<div className="problem-card">
  <div className="problem-header">
    <span className="problem-label">CURRENT PROBLEM</span>
    <span
      className={`difficulty-badge ${
        session.difficulty?.toLowerCase()
      }`}
    >
      {session.difficulty}
    </span>
  </div>

  <h2 className="problem-title">
    {session.title}
  </h2>
</div>
      <div className="time-container">
  <ScoreCard
    title="⏱ Focus Time"
    value={formatTime(session.focusTime)}
  />

  <ScoreCard
    title="😴 Idle Time"
    value={formatTime(session.idleTime)}
  />

  <ScoreCard
    title="⌛ Session Time"
    value={formatTime(session.sessionTime)}
  />
</div>
      <div className="score-container">
        <ScoreCard
          title="📤 Submission Attempts"
          value={session.submissionCount}
        />

        <ScoreCard
          title="📈 Productivity Score"
          value={`${session.productivity}%`}
        />

        <ScoreCard
          title="🔥 Burnout Indicator"
          value={session.burnout}
        />

        <ScoreCard
          title="🎯 Confidence Score"
          value={`${session.confidence}%`}
        />
      </div>
    </div>
  );
}

export default Dashboard;