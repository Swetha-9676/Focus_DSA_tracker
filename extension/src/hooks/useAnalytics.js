import { useEffect, useState } from "react";

function useAnalytics() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    chrome.storage.local.get("sessions", (result) => {
      const data = Object.values(result.sessions || {}).map((session) => {

        const totalTime =
          (session.activeTime || 0) +
          (session.focusTime || 0) +
          (session.idleTime || 0);

        // Session Time = Focus Time + Idle Time
// Session Time = Focus Time + Idle Time
const sessionTime =
  (session.focusTime || 0) +
  (session.idleTime || 0);

let productivity = 0;

if (sessionTime > 0) {
  productivity =
    ((session.focusTime || 0) / sessionTime) * 100;

  // Penalty for tab switching
  productivity -= (session.tabSwitchCount || 0) * 2;

  productivity = Math.max(
    0,
    Math.min(100, Math.round(productivity))
  );
}

      let confidence = 100;

confidence -= (session.tabSwitchCount || 0) * 3;
confidence -= Math.floor((session.idleTime || 0) / 120);

confidence = Math.max(
  0,
  Math.min(100, confidence)
);

        return {
          ...session,
          productivity,
          confidence,
        };
      });

      setSessions(data);
    });
  }, []);

  return sessions;
}

export default useAnalytics;