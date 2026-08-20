import "./Popup.css";
import { useState } from "react";
import useSessionData from "../hooks/useSessionData";
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  if (mins === 0) {
    return `${secs} sec`;
  }

  return `${mins} min ${secs} sec`;
}
function Popup() {
  const session = useSessionData();

  const [hint, setHint] = useState(session.hint);
  const [loading, setLoading] = useState(false);

async function generateHint() {
  if (!session.title) return;

  setLoading(true);

  try {
    const response = await fetch(
      "http://localhost:5000/api/hints/hint",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problemTitle: session.title,
        }),
      }
    );

    console.log("Status:", response.status);

    const data = await response.json();
    console.log("Response:", data);

    setHint(data.hint);
  } catch (error) {
    console.error("Fetch Error:", error);
    setHint("Unable to generate hint.");
  }

  setLoading(false);
}

  return (
    <div className="popup">
      <h2>FOCUS</h2>

      <div className="popup-card">
        <h4>Current Problem</h4>
        <p>{session.title}</p>
      </div>

      <div className="popup-card">
        <h4>Productivity Score</h4>
        <p>{session.productivity}%</p>
      </div>

      <div className="popup-card">
        <h4>Difficulty</h4>
        <p>{session.difficulty}</p>
      </div>
<div className="popup-card">
  <h4>Focus Time</h4>
  <p>{formatTime(session.focusTime)}</p>
</div>
      <div className="popup-card">
        <h4>Tab Switches</h4>
        <p>{session.tabSwitchCount}</p>
      </div>

      <div className="popup-card">
        <h4>AI Hint</h4>

        <p>{loading ? "Generating AI Hint..." : hint}</p>

        <button
          className="dashboard-btn"
          onClick={generateHint}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate AI Hint"}
        </button>
      </div>

      <button
        className="dashboard-btn"
        onClick={() => {
          chrome.tabs.create({
            url: chrome.runtime.getURL("dashboard.html"),
          });
        }}
      >
        View Dashboard
      </button>
    </div>
  );
}

export default Popup;