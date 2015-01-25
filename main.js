var STATUSES = {
  UP: 0,
  DOWN: 1
}
var mouseStatus = {
  left: STATUSES.UP,
  right: STATUSES.UP
}

var BUTTONS = {
  LEFT: 1,
  RIGHT: 3
};

document.addEventListener('mousedown', function(event) {
  if (event.which === BUTTONS.LEFT) {
    mouseStatus.left = STATUSES.DOWN;
    if (mouseStatus.right === STATUSES.DOWN) {
      chrome.extension.sendMessage({
        event: 'previous',
        mouseStatus: mouseStatus
      });
    }
  } else if (event.which === BUTTONS.RIGHT) { 
    mouseStatus.right = STATUSES.DOWN;

    if (mouseStatus.left === STATUSES.DOWN) {
      chrome.extension.sendMessage({
        event: 'next',
        mouseStatus: mouseStatus
      });
    }
  }
});

document.addEventListener('mouseup', function(event) {
  if (event.which === BUTTONS.LEFT) {
    mouseStatus.left = STATUSES.UP;
  } else if (event.which === BUTTONS.RIGHT) { 
    mouseStatus.right = STATUSES.UP;
  }
  chrome.extension.sendMessage({mouseStatus: mouseStatus});
});

document.addEventListener('contextmenu', function(event) {
  if (mouseStatus.left === STATUSES.DOWN) {
    return event.preventDefault();
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  mouseStatus = request;
});