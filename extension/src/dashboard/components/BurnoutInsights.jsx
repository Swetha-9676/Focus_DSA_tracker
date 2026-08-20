import useAnalytics from "../../hooks/useAnalytics";

function BurnoutInsights() {
  const sessions = useAnalytics();

  let longestFocus = 0;
  let totalTabSwitches = 0;
  let totalIdleTime = 0;

  sessions.forEach((session) => {
    longestFocus = Math.max(longestFocus, session.focusTime || 0);
    totalTabSwitches += session.tabSwitchCount || 0;
    totalIdleTime += session.idleTime || 0;
  });

  let recommendation = "Excellent Focus 🚀";

  if (totalIdleTime > 1800 || totalTabSwitches > 30) {
    recommendation = "Take a Short Break ☕";
  } else if (totalIdleTime > 900 || totalTabSwitches > 15) {
    recommendation = "Stay Focused 💪";
  }

  return (
    <div className="card">
      <h3>🔥 Burnout Insights</h3>

      <div className="burnout-grid">
        <div className="insight-box">
          <h4>Longest Focus Session</h4>
          <p>{ Math.ceil(longestFocus / 60)} mins</p>
        </div>

        <div className="insight-box">
          <h4>Tab Switches</h4>
          <p>{totalTabSwitches}</p>
        </div>

        <div className="insight-box">
          <h4>Idle Time</h4>
          <p>{Math.ceil(totalIdleTime / 60)} mins</p>
        </div>

        <div className="insight-box">
          <h4>Recommendation</h4>
          <p>{recommendation}</p>
        </div>
      </div>
    </div>
  );
}

export default BurnoutInsights;