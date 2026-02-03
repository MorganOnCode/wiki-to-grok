# Wiki to Grok

**Wiki to Grok** is a lightweight browser extension that automatically redirects Wikipedia articles to [Grokipedia](https://grokipedia.com) for AI-enhanced summaries and insights.

## Features

- **Automatic Redirection**: Seamlessly redirects `wikipedia.org/wiki/` URLs to their `grokipedia.com/page/` equivalents.
- **Toggle Control**: Easily enable or disable the extension with a single click on the toolbar icon.
- **Visual Status**:
  - **ON** (Green Badge): Redirection is active.
  - **OFF** (Gray Badge): You can browse Wikipedia normally.
- **Persistent State**: The extension remembers your preference (ON/OFF) even after you restart the browser.
- **Privacy Focused**: Uses Manifest V3 and the `declarativeNetRequest` API for efficient, privacy-preserving redirections without inspecting your page content.

## Installation

Since this extension is not yet in the Chrome Web Store, you can install it manually in developer mode:

1. **Clone or Download** this repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/wiki-to-grok.git
   ```
2. Open your browser (Chrome, Edge, Brave, or Arc) and navigate to the **Extensions** page:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
3. Enable **Developer mode** (usually a toggle in the top-right corner).
4. Click the **Load unpacked** button.
5. Select the `wiki-to-grok` folder from your computer.

The extension should now appear in your toolbar.

## Usage

1. **Active Mode**: When the extension is **ON**, navigating to any Wikipedia article (e.g., `https://en.wikipedia.org/wiki/Artificial_intelligence`) will instantly redirect you to the corresponding Grokipedia page (e.g., `https://grokipedia.com/page/Artificial_intelligence`).
2. **Disable**: Click the extension icon in your toolbar. The badge will change to **OFF**, and redirection will stop immediately.
3. **Re-enable**: Click the icon again to turn it back **ON**.

## Technical Details

- **Manifest Version**: 3
- **Primary API**: `chrome.declarativeNetRequest` for performant network request modification.
- **Service Worker**: Handles state management and user interactions essentially resource-free when idle.

## Disclaimer

This project is an unofficial tool and is not affiliated with, endorsed by, or connected to the Wikimedia Foundation or xAI. It is a utility for users who prefer the Grokipedia reading experience.
