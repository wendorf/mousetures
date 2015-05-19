var BUTTONS = {
  LEFT: 0,
  RIGHT: 2
};

var MULTI_BUTTONS = {
  NONE: 0,
  LEFT: 1,
  RIGHT: 2,
  BOTH: 3
};

var Rocker = {
  releasing: false
};

function cancelEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}

document.addEventListener('mousedown', function (event) {
  if (event.buttons === MULTI_BUTTONS.BOTH) {
    cancelMoveGesture();

    var message = event.button === BUTTONS.LEFT ? 'previous' : 'next';
    chrome.extension.sendMessage({
      event: message
    });
  } else if (event.button === BUTTONS.RIGHT) {
    beginMoveGesture(event);
  }
}, true);

document.addEventListener('mouseup', function (event) {
  if (Rocker.releasing || event.buttons !== MULTI_BUTTONS.NONE) {
    cancelEvent(event);
    mouseEventGroup(event).belongsToGesture = true;
  } else if (event.button === BUTTONS.RIGHT) {
    finishMoveGesture(event);
  }

  Rocker.releasing = (event.buttons !== MULTI_BUTTONS.NONE);
}, true);

document.addEventListener('contextmenu', function (event) {
  if (mouseEventGroup(event).belongsToGesture) {
    cancelEvent(event);
  }
}, true);
