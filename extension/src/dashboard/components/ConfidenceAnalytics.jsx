import useAnalytics from "../../hooks/useAnalytics";

function ConfidenceAnalytics() {
  const sessions = useAnalytics();

  const successfulAttempts = sessions.length;

  const retryCount = sessions.reduce(
    (sum, session) => sum + (session.submissionCount || 0),
    0
  );

 const avgSolveTime =
  sessions.length > 0
    ? (
        sessions.reduce(
          (sum, session) => sum + (session.focusTime || 0),
          0
        ) /
        sessions.length /
        60
      ).toFixed(1)
    : "0";

  const confidenceScore =
    sessions.length > 0
      ? Math.round(
          sessions.reduce(
            (sum, session) => sum + (session.confidence || 0),
            0
          ) / sessions.length
        )
      : 0;

  return (
    <div className="card">
      <h3>🎯 Confidence Analytics</h3>

      <div className="confidence-grid">

        <div className="confidence-box">
          <h4>Successful Attempts</h4>
          <p>{successfulAttempts}</p>
        </div>

        <div className="confidence-box">
          <h4>Retry Count</h4>
          <p>{retryCount}</p>
        </div>

        <div className="confidence-box">
          <h4>Avg Solve Time</h4>
          <p>{avgSolveTime} min</p>
        </div>

        <div className="confidence-box">
          <h4>Confidence Score</h4>
          <p>{confidenceScore}%</p>
        </div>

      </div>
    </div>
  );
}

export default ConfidenceAnalytics;