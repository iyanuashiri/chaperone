
# Chaperone: A Browser Extension for Mindful Social Media Use

[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Yay!!%20I%20found%20this%20open%20source%20browser%20extension%20to%20reduce%20Social%20media%20usage%20Check%20it%20out%20-%20&url=https://github.com/iyanuashiri/chaperone&hashtags=free,github,oss,opensource)

Chaperone is a browser extension (available for both Chrome and Firefox) designed to help you manage your time on social media and promote healthier digital habits.  It's based on research suggesting that limiting continuous social media use can improve mental well-being.  After a user-defined time limit on specified websites, Chaperone presents a simple math challenge.  Solving the challenge allows you to postpone the time limit, while failing to solve it (or choosing not to) encourages you to close the tab.

## Table of Contents

- [Chaperone: A Browser Extension for Mindful Social Media Use](#chaperone-a-browser-extension-for-mindful-social-media-use)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Research Basis](#research-basis)
  - [Features](#features)
  - [Installation](#installation)
    - [Chrome](#chrome)
    - [Firefox](#firefox)
    - [Building from Source](#building-from-source)
  - [Usage](#usage)
  - [Directory Structure](#directory-structure)
  - [License](#license)
  - [Demo Video](#demo-video)

## Project Overview

Chaperone aims to reduce excessive social media consumption by introducing a "speed bump" in the form of a cognitive challenge.  This interruption encourages users to be more mindful of their browsing habits and consider taking breaks.  The extension allows customization of:

*   **Time Limit:**  The duration of continuous browsing allowed on restricted websites before the challenge appears.
*   **Restricted Websites:**  A list of websites (using URL patterns) where the time limit and challenge will be enforced.
*   **Postponement Options:**  After solving the challenge, users can choose to postpone the time limit for a set period (e.g., 1, 2, 5, or 10 minutes, or a custom duration).

## Research Basis

This project is inspired by and builds upon research in the field of digital mental health, specifically focusing on the negative impacts of excessive social media use.  The core concept is derived from a self-experiment (N-of-1 study) detailed in the following abstract:

**Abstract Title:** Advancing Digital Mental Health: A Self-Experiment on Limiting Social Media Use

**Key Findings:** The self-experiment showed that a simple intervention (a modal popup with a cognitive task) triggered after a set time limit on social media sites led to:

*   Reduced average session duration.
*   Lower self-reported levels of loneliness and anxiety.
*   Increased mindfulness and disruption of habitual scrolling.

**Relevant Research Papers:**

*   **Hunt, M. G., Marx, R., Lipson, C., & Young, J. (2018).** No More FOMO: Limiting Social Media Decreases Loneliness and Depression. *Journal of Social and Clinical Psychology, 37*(10), 751-768.
*   **Kross, E., Verduyn, P., Demiralp, E., Park, J., Lee, D. S., Lin, N., ... & Ybarra, O. (2013).** Facebook Use Predicts Declines in Subjective Well-Being in Young Adults. *PLoS ONE, 8*(8), e69841.
*   **Verduyn, P., Lee, D. S., Park, J., Shablack, H., Orvell, A., Bayer, J., ... & Kross, E. (2017).** Passive Facebook usage undermines affective well-being: Experimental and longitudinal evidence. *Journal of Experimental Psychology: General, 146*(4), 554.

**Limitations:** The abstract acknowledges the limitations of the N-of-1 study design, including potential individual-specific biases and the reliance on self-reported measures.  This extension serves as a practical implementation of the intervention described in the research, allowing for broader individual use and potential future data collection.

## Features

*   **Customizable Time Limits:** Set the maximum browsing time (in minutes) for restricted websites.
*   **Website Blocking/Restriction:**  Define a list of websites to which the time limit applies.  Supports wildcard patterns (e.g., `*://*.twitter.com/*`).
*   **Math Challenge:**  A simple arithmetic problem (addition or subtraction) must be solved to postpone the time limit.
*   **Postponement Options:**  After successfully completing the challenge, choose from pre-defined postponement durations (1, 2, 5, 10 minutes) or enter a custom duration.
*   **Close Tab Option:**  Users can choose to close the restricted tab instead of solving the challenge or postponing.
*   **Settings Persistence:**  Time limits and restricted websites are saved using the browser's storage API.
*   **Chrome and Firefox Compatibility:**  Separate builds are provided for Chrome and Firefox.
*   **User-Friendly Interface:**  The options page and popup are designed with a clean, modern look using Tailwind CSS.

## Installation

### Chrome

1.  **Download:** [Link to Chrome Web Store listing - *Replace with actual link when published*]  (Not yet published)
2.  **Install:** Click "Add to Chrome".

### Firefox

1.  **Download:** [Link to Firefox Add-ons listing - *Replace with actual link when published*] (Not yet published)
2.  **Install:** Click "Add to Firefox".

### Building from Source

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/iyanuashiri/chaperone.git  # Replace with your actual repo URL
    cd chaperone
    ```

2.  **Install Dependencies (if any):**  This project doesn't have external npm dependencies for the core extension logic, but Tailwind CSS is used for styling.  If you modify the styles, you'll need to rebuild them.  See the "Contributing" section for details.

3.  **Load the extension (Chrome):**

    *   Open Chrome and go to `chrome://extensions/`.
    *   Enable "Developer mode" (top right corner).
    *   Click "Load unpacked".
    *   Select the `chaperone-chrome` directory.

4.  **Load the extension (Firefox):**

    *   Open Firefox and go to `about:debugging`.
    *   Click "This Firefox" on the left.
    *   Click "Load Temporary Add-on...".
    *   Select the `manifest.json` file inside the `chaperone-firefox` directory.

## Usage

1.  **Open the Options Page:**
    *   **Chrome:** Right-click the Chaperone icon in the toolbar and select "Options".  Alternatively, find Chaperone in `chrome://extensions/` and click "Details," then "Extension options."
    *   **Firefox:** Right-click the Chaperone icon in the toolbar and select "Manage Extension". Then, click the three dots next to the extension name and select "Preferences".  Alternatively, go to `about:addons`, find Chaperone, and click the three dots, then "Preferences."

2.  **Set the Time Limit:**  Enter the desired time limit (in minutes) in the "Time Limit" input field.

3.  **Add Restricted Websites:**
    *   Enter the URL of the website you want to restrict in the "Enter website URL" input field.  You can use a simplified format (e.g., `twitter.com`, `facebook.com`). The extension automatically converts this to a wildcard pattern (e.g., `*://*.twitter.com/*`).
    *   Click "Add URL".
    *   To remove a URL, click the "Remove" button next to it.

4.  **Save Changes:** Click the "Save Changes" button.  A success message will appear briefly.

5.  **Browsing:** When you visit a restricted website, a timer starts.  Once the time limit is reached, a modal window will appear with a math challenge.

6.  **Challenge Interaction:**
    *   **Solve:** Enter the correct answer and click "Submit" to proceed to the postponement options.
    *   **Incorrect Answer:** An error message will be displayed.  You can try again.
    *   **Close Tab:** Click "Close Tab" to close the current tab.

7.  **Postponement:**
    *   **Quick Options:** Click one of the pre-defined postponement buttons (1, 2, 5, 10 minutes).
    *   **Custom Time:** Enter a custom duration (in minutes) and click "Set".
    *   **Close Tab:** Click "Close Tab" to close the current tab.

## Directory Structure


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



## Demo Video


<!-- ![](reduce_social_media.gif) -->


![](chaperone-demo.gif)
