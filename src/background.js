function currentTab(tabs) {
  return tabs.filter(function(tab) { return tab.active; })[0];
}

function previousTab(tabs) {
  var current = currentTab(tabs);
  var previousIndex = current.index - 1;
  if (previousIndex === -1) {
    var previousId = tabs[tabs.length - 1].id;
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
  chrome.tabs.update(tab.id, {active: true});
}

var actions = {
  "previous": function() {
    chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function(tabs) {
      navigateTo(previousTab(tabs));
    });
  },
  "next": function() {
    chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function(tabs) {
      navigateTo(nextTab(tabs));
    });
  },
  "closeCurrent": function(sender) {
    chrome.tabs.remove(sender.tab.id);
  },
  "reloadCurrent": function(sender) {
    chrome.tabs.reload(sender.tab.id);
  }
};

chrome.extension.onMessage.addListener(function(request, sender) {
  if(request.event) {
    actions[request.event](sender);
  }
});

chrome.storage.sync.get('gestureMap', function(items) {
  if(!items['gestureMap']) {
    var DEFAULT_GESTURE_MAP = {
      rockLeft: 'previous',
      rockRight: 'next',

      D: 'closeCurrent',
      DU: 'reloadCurrent'
    };

    chrome.storage.sync.set({'gestureMap': DEFAULT_GESTURE_MAP});
  }
});