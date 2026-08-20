import useAnalytics from "../../hooks/useAnalytics";

function DailyHistory() {
  const sessions = useAnalytics();

  return (
    <div className="card">
      <h3>📅 Daily History</h3>

      <table className="history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Productivity</th>
            <th>Confidence</th>
          </tr>
        </thead>

        <tbody>
          {sessions.length > 0 ? (
            sessions.map((session, index) => (
              <tr key={index}>
                <td>{session.createdDate || "N/A"}</td>
                <td>{session.productivity}%</td>
                <td>{session.confidence}%</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No history available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DailyHistory;