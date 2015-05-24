var actions = [
  {
    shortDescription: 'Previous Tab',
    id: 'previous',
    defaultGesture: 'rockLeft',
    func: function () {
      chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function (tabs) {
        navigateTo(previousTab(tabs));
      });
    }
  },
  {
    id: 'next',
    shortDescription: 'Next Tab',
    defaultGesture: 'rockRight',
    func: function () {
      chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function (tabs) {
        navigateTo(nextTab(tabs));
      });
    }
  },
  {
    id: 'close',
    shortDescription: 'Close Tab',
    defaultGesture: 'D',
    func: function (sender) {
      chrome.tabs.remove(sender.tab.id);
    }
  },
  {
    id: 'reload',
    shortDescription: 'Reload Tab',
    defaultGesture: 'DU',
    func: function (sender) {
      chrome.tabs.reload(sender.tab.id);
    }
  }
];

function action(id) {
  return actions.filter(function(action) { return action.id === id; })[0].func;
}

function defaultGestureMap() {
  return actions.reduce(function(map, action) {
    map[action.defaultGesture] = action.id;
    return map;
  }, {});
}
