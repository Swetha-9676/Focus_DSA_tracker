# FOCUS --- Smart DSA Study Tracker

FOCUS is a Chrome extension and dashboard that helps users track
LeetCode practice, monitor focus time, and review coding-productivity
information. The project also integrates the Gemini API to provide
AI-assisted conceptual hints.

## Features

-   Track LeetCode practice activity.
-   Monitor focus time.
-   Review coding activity and productivity analytics in a React
    dashboard.
-   Request AI-assisted conceptual hints through the Gemini API.

> Keep only the features that are implemented and working in your
> current version. Describe precisely what is tracked and how the
> extension detects it.

## Tech Stack

-   **Frontend / Dashboard:** React.js, JavaScript
-   **Browser integration:** Chrome Extension APIs, Chrome Storage API
-   **AI integration:** Gemini API

## Project Structure

Update this example to match your actual repository:

``` text
FOCUS/
├── extension/     # Extension files (if applicable)
├── dashboard/     # React dashboard (if applicable)
└── README.md
```

## Getting Started

### Prerequisites

-   Google Chrome
-   Node.js and npm, if the dashboard uses a Node-based build process
-   A Gemini API key for AI features

### Install the Chrome Extension

1.  Clone your repository:

    ``` bash
    git clone <YOUR_REPOSITORY_URL>
    cd <YOUR_REPOSITORY_FOLDER>
    ```

2.  Open `chrome://extensions` in Chrome.

3.  Turn on **Developer mode**.

4.  Choose **Load unpacked**.

5.  Select the directory containing the extension's `manifest.json`
    file.

Use the actual directory in your repository that contains
`manifest.json`.

### Run the Dashboard

If your dashboard has its own `package.json`:

``` bash
npm install
npm run dev
```

These are common example commands. Check your repository's scripts and
use the command defined there.

### Configure Gemini API Access

Configure the API key using the method supported by your implementation.
Do not commit API keys to GitHub or expose private credentials in
client-side code. For a public project, consider a backend service to
protect the key if the architecture allows it.

## How It Works

At a high level, the project combines:

1.  Browser-extension functionality to track the activity supported by
    the implementation.
2.  Chrome Storage API to persist the data the extension stores.
3.  A React dashboard to present collected information and productivity
    analytics.
4.  Gemini API integration to generate conceptual hints when requested.

Update this section with the actual data flow and the limitations of the
current implementation.

## Screenshots

Add screenshots from your project, for example:

``` markdown
![FOCUS dashboard](screenshots/dashboard.png)
```

Only use image paths that exist in the repository.

## Privacy Notes

-   Explain what browser activity is collected and stored.
-   Avoid collecting or storing information that is not necessary for
    the app's purpose.
-   Do not commit API keys, tokens, or personal user data.
-   Clearly communicate any data sent to an external AI service.

## Future Improvements

-   Add tests for tracking logic and dashboard components.
-   Improve handling of missing or malformed stored data.
-   Add clear error messages for failed API requests.
-   Document supported Chrome versions and known limitations.

## Contributing

1.  Open an issue or describe the change you plan to make.
2.  Create a branch.
3.  Implement and test the change.
4.  Submit a pull request with a clear summary.

## License

Add the license chosen for the repository. Do not assume that a license
exists unless you have added one.
