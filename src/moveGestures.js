var previous;
var path;
var trackingMoveGesture = false;
var MINIMUM_DISTANCE_BETWEEN_POINTS = 15;

var gestures = {
  D: function() {
    chrome.extension.sendMessage({
      event: 'closeCurrent'
    });
  },
  DU: function() {
    chrome.extension.sendMessage({
      event: 'reloadCurrent'
    });
  }
};

function beginMoveGesture(event) {
  previous = new Point(event);
  path = [];

  trackingMoveGesture = true;
  document.addEventListener('mousemove', moveTracker, true);
}

function cancelMoveGesture() {
  path = [];
  trackingMoveGesture = false;
  document.removeEventListener('mousemove', moveTracker, true);
}

function finishMoveGesture() {
  if (!trackingMoveGesture) {
    return;
  }

  var gesture = gestures[path.join('')];
  if (gesture) {
    event.preventDefault();
    event.stopPropagation();
    mouseEventGroup(event).belongsToGesture = true;

    gesture();
  }

  cancelMoveGesture();
}

function moveTracker(event) {
  var current = new Point(event);

  if(current.distanceFrom(previous) >= MINIMUM_DISTANCE_BETWEEN_POINTS) {
    var direction = current.directionFrom(previous);
    if(direction != path[path.length - 1]) {
        path.push(direction);
    }

    previous = current;
  }
}
