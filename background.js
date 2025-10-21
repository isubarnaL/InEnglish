// background.js (service worker)

chrome.runtime.onInstalled.addListener(() => {
  // Clear existing rules
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: [
      {
        id: 1,
        priority: 1,
        action: {
          type: "redirect",
          redirect: {
            transform: {
              queryTransform: {
                addOrReplaceParams: [{ key: "hl", value: "en" }]
              }
            }
          }
        },
        condition: {
          urlFilter: "google.com/",
          resourceTypes: ["main_frame"]
        }
      }
    ]
  });

  console.log("Force Google English rule installed.");
});
