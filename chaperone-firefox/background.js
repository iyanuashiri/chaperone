const DEFAULT_SETTINGS = {
    timeLimit: 60000, // Initial time limit: 1 minute (for testing)
    urls: ["*://*.twitter.com/*", "*://*.facebook.com/*", "*://*.instagram.com/*", "*://*.youtube.com/*"],
};

let timers = {};
let currentSettings = DEFAULT_SETTINGS;


// Function to load settings from browser storage
function loadSettings(callbackFunction) {
    function handleStorageResult(savedSettings) {
        currentSettings = savedSettings;
        callbackFunction(savedSettings);
    }
    
    browser.storage.sync.get(DEFAULT_SETTINGS, handleStorageResult);
}



// Check if a URL matches any pattern in the settings
function isUrlRestricted(url) {
    return currentSettings.urls.some(pattern => {
        const regexPattern = pattern.replace(/\*/g, '.*');
        return url.match(new RegExp(regexPattern));
    });
}



function wakeUpShowModal(tabId, timeLimit){
    browser.tabs.sendMessage(tabId, {
        action: "showModal",
        timeLimit: timeLimit,
        tabId: tabId
    })
    delete timers[tabId];
} 


function startTimer(tabId, timeLimit) {
    if (timers[tabId]) {
        clearTimeout(timers[tabId]);
    }

    timers[tabId] = setTimeout(() => wakeUpShowModal(tabId, timeLimit), timeLimit);
   
}

// Check and update all open tabs when settings change
async function updateAllTabs() {
    const tabs = await browser.tabs.query({});

    tabs.forEach(tab => {
        if (tab.url && isUrlRestricted(tab.url)) {
            startTimer(tab.id, currentSettings.timeLimit);
        } else if (timers[tab.id]) {
            clearTimeout(timers[tab.id]);
            delete timers[tab.id];
        }
    });
}

// Listen for tab updates
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        if (isUrlRestricted(tab.url)) {
            startTimer(tabId, currentSettings.timeLimit);
        } else if (timers[tabId]) {
            clearTimeout(timers[tabId]);
            delete timers[tabId];
        }
    }
});

// Clean up timers when tabs are closed
browser.tabs.onRemoved.addListener((tabId) => {
    if (timers[tabId]) {
        clearTimeout(timers[tabId]);
        delete timers[tabId];
    }
});

// Handle messages from content script and options page
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.action) {
        case "closeTab":
            browser.tabs.remove(message.tabId);
            break;
        case "postpone":
            startTimer(message.tabId, message.delay);
            break;
        case "settingsUpdated":
            loadSettings(() => {
                updateAllTabs();
            });
            break;
    }
});


function afterSettingsLoaded(settings) {
    updateAllTabs();
    console.log("Settings loaded:", settings);
}

loadSettings(afterSettingsLoaded);