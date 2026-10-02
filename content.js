let currentSettings = {};

chrome.storage.local.get({
    hideReels: true,
    hideReelsTab: true,
    hideStories: true,
    hideExploreReels: true,
    hideShorts: true
}, (items) => {
    currentSettings = items;
    initializeHiding();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateSettings') {
        currentSettings = { ...currentSettings, ...request.settings };
        removeAllHiddenElements();
        initializeHiding();
        sendResponse({ status: 'updated' });
    }
});

function initializeHiding() {
    hideReels();
    observeChanges();
}

function hideReels() {
    if (currentSettings.hideReels) {
        hideReelsFromFeed();
    }
    
    if (currentSettings.hideReelsTab) {
        hideReelsNavigation();
    }
    
    if (currentSettings.hideStories) {
        hideStories();
    }
    
    if (currentSettings.hideExploreReels) {
        hideExploreReels();
    }
    
    if (currentSettings.hideShorts) {
        hideShorts();
    }
}

function hideReelsFromFeed() {
    const reelPosts = document.querySelectorAll('article');
    
    reelPosts.forEach(article => {
        const isReel = 
            article.querySelector('[aria-label*="Reel"]') ||
            article.querySelector('[aria-label*="reel"]') ||
            article.innerText.toLowerCase().includes('reel');
        
        if (isReel) {
            article.style.display = 'none';
            article.classList.add('reels-hider-hidden');
        }
    });

    const svgElements = document.querySelectorAll('svg');
    svgElements.forEach(svg => {
        const label = svg.getAttribute('aria-label');
        if (label && label.toLowerCase().includes('reel')) {
            const article = svg.closest('article');
            if (article) {
                article.style.display = 'none';
                article.classList.add('reels-hider-hidden');
            }
        }
    });
}

function hideReelsNavigation() {
    const navLinks = document.querySelectorAll('a[href*="/reels/"]');
    navLinks.forEach(link => {
        link.style.display = 'none';
        link.classList.add('reels-hider-hidden');
    });

    const reelsNav = document.querySelectorAll('[role="menuitem"]');
    reelsNav.forEach(item => {
        const text = item.innerText.toLowerCase();
        const label = item.getAttribute('aria-label');
        if (text.includes('reels') || (label && label.toLowerCase().includes('reels'))) {
            item.style.display = 'none';
            item.classList.add('reels-hider-hidden');
        }
    });
}

function hideStories() {
    const storyContainers = document.querySelectorAll('[role="menuitem"]');
    storyContainers.forEach(container => {
        const label = container.getAttribute('aria-label');
        if (label && label.toLowerCase().includes('story')) {
            container.style.display = 'none';
            container.classList.add('reels-hider-hidden');
        }
    });
}

function hideExploreReels() {
    const gridItems = document.querySelectorAll('[role="grid"] article');
    gridItems.forEach(item => {
        if (item.querySelector('video') || item.querySelector('[aria-label*="Reel"]')) {
            item.style.display = 'none';
            item.classList.add('reels-hider-hidden');
        }
    });

    document.querySelectorAll('article').forEach(article => {
        const video = article.querySelector('video');
        const isReelIndicator = article.querySelector('[aria-label*="Reel"]');
        if (video || isReelIndicator) {
            article.style.display = 'none';
            article.classList.add('reels-hider-hidden');
        }
    });
}

function hideShorts() {
    const videoElements = document.querySelectorAll('video');
    videoElements.forEach(video => {
        const article = video.closest('article');
        const container = video.closest('[role="menuitem"]');
        
        if (article) {
            article.style.display = 'none';
            article.classList.add('reels-hider-hidden');
        }
        if (container) {
            container.style.display = 'none';
            container.classList.add('reels-hider-hidden');
        }
    });
}

function removeAllHiddenElements() {
    document.querySelectorAll('.reels-hider-hidden').forEach(el => {
        el.style.display = '';
        el.classList.remove('reels-hider-hidden');
    });
}

function observeChanges() {
    const observer = new MutationObserver(() => {
        hideReels();
    });

    const config = {
        childList: true,
        subtree: true,
        attributes: false
    };

    const feedArea = document.querySelector('[role="main"]');
    if (feedArea) {
        observer.observe(feedArea, config);
    }

    observer.observe(document.body, config);
    setInterval(hideReels, 2000);
}

let lastUrl = location.href;
new MutationObserver(() => {
    let url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        setTimeout(() => {
            removeAllHiddenElements();
            hideReels();
        }, 500);
    }
}).observe(document, { subtree: true, childList: true });
