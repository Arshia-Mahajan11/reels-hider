const defaultSettings = {
    hideReels: true,
    hideReelsTab: true,
    hideStories: true,
    hideExploreReels: true,
    hideShorts: true
};

document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    setupEventListeners();
});

function loadSettings() {
    chrome.storage.local.get(defaultSettings, (items) => {
        document.getElementById('hideReels').checked = items.hideReels;
        document.getElementById('hideReelsTab').checked = items.hideReelsTab;
        document.getElementById('hideStories').checked = items.hideStories;
        document.getElementById('hideExploreReels').checked = items.hideExploreReels;
        document.getElementById('hideShorts').checked = items.hideShorts;
    });
}

function setupEventListeners() {
    const toggles = ['hideReels', 'hideReelsTab', 'hideStories', 'hideExploreReels', 'hideShorts'];
    
    toggles.forEach(toggle => {
        document.getElementById(toggle).addEventListener('change', (e) => {
            saveSettings({
                [toggle]: e.target.checked
            });
        });
    });

    document.getElementById('resetBtn').addEventListener('click', resetSettings);
}

function saveSettings(settings) {
    chrome.storage.local.set(settings, () => {
        chrome.tabs.query({url: 'https://www.instagram.com/*'}, (tabs) => {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, {
                    action: 'updateSettings',
                    settings: settings
                }).catch(() => {});
            });
        });
    });
}

function resetSettings() {
    if (confirm('Reset all settings to default?')) {
        chrome.storage.local.set(defaultSettings, () => {
            loadSettings();
            chrome.tabs.query({url: 'https://www.instagram.com/*'}, (tabs) => {
                tabs.forEach(tab => {
                    chrome.tabs.sendMessage(tab.id, {
                        action: 'updateSettings',
                        settings: defaultSettings
                    }).catch(() => {});
                });
            });
        });
    }
}
