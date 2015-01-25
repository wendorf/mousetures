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

document.onmousedown = function(event) {
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
};

document.onmouseup = function(event) {
  if (event.which === BUTTONS.LEFT) {
    mouseStatus.left = STATUSES.UP;
  } else if (event.which === BUTTONS.RIGHT) { 
    mouseStatus.right = STATUSES.UP;
  }
  chrome.extension.sendMessage({mouseStatus: mouseStatus});
};

document.oncontextmenu = function(event) {
  if (mouseStatus.left === STATUSES.DOWN) {
    return false;
  }
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  mouseStatus = request;
});