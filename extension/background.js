console.log("Background Service Worker Running");

chrome.runtime.onInstalled.addListener(() => {
    console.log("FOCUS Installed");

    chrome.alarms.create("analyticsUpdate", {
        periodInMinutes: 30
    });

    console.log("30-minute analytics alarm created");
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

    if (msg.type === "RUN_DAILY_ANALYTICS") {

        console.log("RUN_DAILY_ANALYTICS message received");

        sendResponse({
            status: "ok"
        });

        return true;
    }
});

chrome.alarms.onAlarm.addListener((alarm) => {

    if (alarm.name === "analyticsUpdate") {

        console.log("Analytics alarm triggered");
    }
});