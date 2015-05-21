chrome.runtime.onInstalled.addListener(function() {
  onValidTabActivated(function(tab) {
    chrome.tabs.executeScript(tab.id, {code: "window.contentScriptLoaded"}, function(arr) {
      if (!arr || !arr[0]) {
        injectIntoTab(tab);
      }
    });
  })
});

var contentScripts = chrome.app.getDetails().content_scripts[0].js;
var injectIntoTab = function (tab) {
  contentScripts.forEach(function(script) {
    chrome.tabs.executeScript(tab.id, {
      file: script,
      allFrames: true
    });
  });
};

function onValidTabActivated(callback) {
  chrome.tabs.onActivated.addListener(function(info) {
    chrome.tabs.get(info.tabId, function(tab) {
      if (!validTab(tab)) { return; }

      chrome.windows.get(tab.windowId, function(window) {
        if (!validWindow(window)) { return; }

        callback(tab);
      });
    });
  });
}

function validTab(tab) {
  return tab && tab.status == "complete" && /^https?:/.test(tab.url);
}

function validWindow(window) {
  return window && window.type == "normal";
}
