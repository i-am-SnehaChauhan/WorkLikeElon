document.addEventListener("DOMContentLoaded", function () {
    const blockedList = document.getElementById("blockedList");
    const siteInput = document.getElementById("siteInput");
    const blockButton = document.getElementById("blockButton");
  
    // Display blocked sites
    chrome.storage.sync.get("blockedSites", function (data) {
      const blockedSites = data.blockedSites || [];
      blockedList.innerHTML = blockedSites.map(site => `<li>${site}</li>`).join("");
    });
  
    // Block site
    blockButton.addEventListener("click", function () {
      const site = siteInput.value.trim();
      if (site) {
        chrome.storage.sync.get("blockedSites", function (data) {
          const blockedSites = data.blockedSites || [];
          blockedSites.push(site);
          chrome.storage.sync.set({ blockedSites });
          blockedList.innerHTML += `<li>${site}</li>`;
          siteInput.value = "";
        });
      }
    });
  });
  