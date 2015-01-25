function currentTab(tabs) {
  return tabs.filter(function(tab) { return tab.active; })[0];
}

function previousTab(tabs) {
  var current = currentTab(tabs);
  var previousIndex = current.index - 1;
  if (previousIndex === -1) {
    var previousId = tabs[tabs.length - 1].id
    return tabs.filter(function(tab) { return tab.id === previousId })[0];
  } else {
    return tabs.filter(function(tab) { return tab.index === previousIndex })[0];
  }
}

function nextTab(tabs) {
  var current = currentTab(tabs);
  var nextIndex = current.index + 1;
  var nextTabs = tabs.filter(function(tab) { return tab.index === nextIndex });
  if (nextTabs.length > 0) {
    return nextTabs[0];
  } else {
    return tabs.filter(function(tab) { return tab.index === 0 })[0];
  }
}

function navigateTo(tab) {
  var protocol = tab.url.split(':')[0];
  var supportedProtocols = ['https', 'http'];
  if (supportedProtocols.every(function(p) { return p !== protocol })) {
    mouseStatus = defaultMouseStatus();
  }
  chrome.tabs.update(tab.id, {active: true});
}

var actions = {
  "previous": function(mouseStatus) {
    chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function(tabs) {
      navigateTo(previousTab(tabs));
    });
  },
  "next": function(mouseStatus) {
    chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function(tabs) {
      navigateTo(nextTab(tabs));
    });
  }
};

var mouseStatus = defaultMouseStatus();
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  mouseStatus = request.mouseStatus;
  if(request.event) {
    actions[request.event](request.mouseStatus);
  }
});
chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.sendMessage(activeInfo.tabId, mouseStatus);
});
