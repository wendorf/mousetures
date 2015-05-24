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

chrome.extension.onMessage.addListener(function(request, sender) {
  if(request.event) {
    action(request.event)(sender);
  }
});

chrome.storage.sync.get('gestureMap', function(items) {
  if(!items['gestureMap']) {
    chrome.storage.sync.set({'gestureMap': defaultGestureMap()});
  }
});
