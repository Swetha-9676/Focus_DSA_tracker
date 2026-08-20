import { useEffect, useState } from "react";

function useSessionData() {
  const [session, setSession] = useState({
    title: "Loading...",
    difficulty: "-",
    focusTime: 0,
    activeTime: 0,
    idleTime: 0,
    tabSwitchCount: 0,
    submissionCount: 0,
    productivity: 0,
    confidence: 0,
    burnout: "Low",
    hint: "Click Generate AI Hint",
  });

  useEffect(() => {
    function loadSession() {
  chrome.storage.local.get("sessions", (result) => {
    const sessions = Object.values(result.sessions || {});

    if (sessions.length === 0) return;

    const latest = sessions.sort(
      (a, b) =>
        new Date(b.lastVisited || b.createdDate) -
        new Date(a.lastVisited || a.createdDate)
    )[0];

      // Session Time = Focus Time + Idle Time
// Session Time = Focus Time + Idle Time
const sessionTime =
  (latest.focusTime || 0) +
  (latest.idleTime || 0);

let productivity = 0;

if (sessionTime > 0) {
  productivity =
    ((latest.focusTime || 0) / sessionTime) * 100;

  // Penalty for tab switching
  productivity -= (latest.tabSwitchCount || 0) * 2;

  productivity = Math.max(
    0,
    Math.min(100, Math.round(productivity))
  );
}

      // ---------------- Confidence Score ----------------

let confidence = 100;

// Problem not solved
if (!latest.solved) {
  confidence = 0;
} else {

  // Wrong submission penalty
  confidence -= Math.min(
    20,
    (latest.wrongSubmissionCount || 0) * 5
  );

  // Tab switch penalty
  confidence -= Math.min(
    20,
    (latest.tabSwitchCount || 0) * 2
  );

  // Idle time penalty
  confidence -= Math.min(
    10,
    Math.floor((latest.idleTime || 0) / 120)
  );

  confidence = Math.max(
    0,
    Math.min(100, confidence)
  );
}

      // ---------------- Burnout Detection ----------------

let burnoutScore = 0;

// Idle Time Percentage
const idlePercentage =
  sessionTime > 0
    ? ((latest.idleTime || 0) / sessionTime) * 100
    : 0;

// 1. Idle Time Contribution
if (idlePercentage > 40) {
  burnoutScore += 40;
} else if (idlePercentage >= 20) {
  burnoutScore += 20;
}

// 2. Tab Switching Contribution
if ((latest.tabSwitchCount || 0) >= 8) {
  burnoutScore += 40;
} else if ((latest.tabSwitchCount || 0) >= 4) {
  burnoutScore += 20;
}

// 3. Long Session Contribution
if (sessionTime >= 3600) {
  burnoutScore += 20;     // > 60 min
} else if (sessionTime >= 1800) {
  burnoutScore += 10;     // 30–60 min
}

// Final Burnout Level
let burnout = "Low";

if (burnoutScore > 60) {
  burnout = "High";
} else if (burnoutScore > 30) {
  burnout = "Medium";
}

      setSession({
        ...latest,
        sessionTime,
        productivity,
        confidence,
        burnout,
        hint: "Click Generate AI Hint",
      });
    });
  }
    loadSession();

    const interval = setInterval(() => {
        loadSession();
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  

  return session;
}

export default useSessionData;