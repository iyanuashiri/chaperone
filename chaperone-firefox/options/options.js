document.addEventListener('DOMContentLoaded', () => {
    const timeLimitInput = document.getElementById('timeLimit');
    const urlList = document.getElementById('urlList');
    const newUrlInput = document.getElementById('newUrl');
    const addUrlButton = document.getElementById('addUrl');
    const saveButton = document.getElementById('save');

    // Default settings
    const DEFAULT_SETTINGS = {
        timeLimit: 60000, // 1 minute - for testing
        urls: ["*://*.twitter.com/*", "*://*.facebook.com/*", "*://*.instagram.com/*", "*://*.youtube.com/*"]
    };

    // Load existing settings
    browser.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
        timeLimitInput.value = settings.timeLimit / 60000;
        settings.urls.forEach(url => addUrlToList(url));
    });

    function addUrlToList(url) {
        const li = document.createElement('li');
        li.className = "flex items-center justify-between p-3 mb-2 rounded-lg border border-gray-200 bg-white";
        
        const urlText = document.createElement('span');
        urlText.textContent = url;
        urlText.className = "text-gray-600";
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = "px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors";
        
        removeButton.addEventListener('click', () => {
            li.remove();
        });

        li.appendChild(urlText);
        li.appendChild(removeButton);
        urlList.appendChild(li);
    }

    function formatUrl(url) {
        // Remove whitespace
        url = url.trim();
        
        // Remove http:// or https:// if present
        url = url.replace(/^https?:\/\//, '');
        
        // Remove www. if present
        url = url.replace(/^www\./, '');
        
        // Remove trailing slash if present
        url = url.replace(/\/$/, '');
        
        // Add wildcard pattern
        return `*://*.${url}/*`;
    }

    addUrlButton.addEventListener('click', () => {
        const newUrl = newUrlInput.value.trim();
        if (newUrl) {
            const formattedUrl = formatUrl(newUrl);
            addUrlToList(formattedUrl);
            newUrlInput.value = '';
        }
    });

    // Also handle Enter key in the input
    newUrlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && newUrlInput.value.trim()) {
            const formattedUrl = formatUrl(newUrlInput.value);
            addUrlToList(formattedUrl);
            newUrlInput.value = '';
        }
    });

    // saveButton.addEventListener('click', () => {
    //     const timeLimit = parseInt(timeLimitInput.value, 10) * 60000;
    //     const urls = Array.from(urlList.children).map(li => li.firstChild.textContent);

    //     browser.storage.sync.set({ timeLimit, urls }, () => {
    //         // Show success message
    //         const successMsg = document.createElement('div');
    //         successMsg.className = "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg";
    //         successMsg.textContent = 'Settings saved successfully!';
    //         document.body.appendChild(successMsg);
            
    //         // Remove success message after 3 seconds
    //         setTimeout(() => {
    //             successMsg.remove();
    //         }, 3000);
    //     });
    // });


    saveButton.addEventListener('click', () => {
        const timeLimit = parseInt(timeLimitInput.value, 10) * 60000;
        const urls = Array.from(urlList.children).map(li => li.firstChild.textContent);

        browser.storage.sync.set({ timeLimit, urls }, () => {
            // Notify background script that settings were updated
            browser.runtime.sendMessage({ action: "settingsUpdated" });
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg";
            successMsg.textContent = 'Settings saved successfully!';
            document.body.appendChild(successMsg);
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
        });
    });
});