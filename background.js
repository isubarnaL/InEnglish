chrome.runtime.onInstalled.addListener(async () => {
  // Remove old dynamic rules
  const existing = await chrome.declarativeNetRequest.getDynamicRules();
  const ids = existing.map(rule => rule.id);
  if (ids.length) {
    await chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: ids });
  }

  // Add new redirect rules
  await chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      // --- Google (hl=en) ---
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
          urlFilter: "google.",
          resourceTypes: ["main_frame"]
        }
      },

      // --- Bing (setlang=en-us) ---
      {
        id: 2,
        priority: 1,
        action: {
          type: "redirect",
          redirect: {
            transform: {
              queryTransform: {
                addOrReplaceParams: [{ key: "setlang", value: "en-us" }]
              }
            }
          }
        },
        condition: {
          urlFilter: "bing.com/",
          resourceTypes: ["main_frame"]
        }
      },

      // --- Microsoft (mkt=en-us) ---
      {
        id: 3,
        priority: 1,
        action: {
          type: "redirect",
          redirect: {
            transform: {
              queryTransform: {
                addOrReplaceParams: [{ key: "mkt", value: "en-us" }]
              }
            }
          }
        },
        condition: {
          urlFilter: "microsoft.",
          resourceTypes: ["main_frame"]
        }
      }
    ]
  });

  console.log("✅ English Please! active for Google, Bing, and Microsoft.");
});
