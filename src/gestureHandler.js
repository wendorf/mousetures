var gestureMap;

function executeActionForGesture(gesture) {
  var action = findActionByGesture(gesture);

  if (action) {
    chrome.extension.sendMessage({event: action});
  }

  return !!action;
}

function findActionByGesture(gesture) {
  return (gestureMap || [])[gesture];
}

chrome.storage.sync.get('gestureMap', function(items) {
  gestureMap = items['gestureMap'];
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'sync' && changes['gestureMap']) {
    gestureMap = changes['gestureMap'].newValue;
  }
});
