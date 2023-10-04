chrome.runtime.onInstalled.addListener(function () {
    // Set up initial block list
    chrome.storage.sync.set({ blockedSites: [] });
  });
  
  chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
      // Check if the requested site is in the block list
      chrome.storage.sync.get("blockedSites", function (data) {
        const blockedSites = data.blockedSites || [];
        const url = new URL(details.url);
        if (blockedSites.includes(url.hostname)) {
          return { cancel: true };
        }
      });
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
  );
  