var mouseStatus = new MouseStatus();
mouseStatus.ready.then(function(response) {
  document.addEventListener('mousedown', function(event) {
    if (event.button === BUTTONS.LEFT) {
      mouseStatus.left(STATUSES.DOWN);

      if (mouseStatus.right() === STATUSES.DOWN || mouseStatus.right() === STATUSES.SWITCHING) {
        mouseStatus.right(STATUSES.SWITCHING);
        mouseStatus.left(STATUSES.SWITCHING);

        chrome.extension.sendMessage({
          event: 'previous'
        });
      }
    } else if (event.button === BUTTONS.RIGHT) {
      mouseStatus.right(STATUSES.DOWN);

      if (mouseStatus.left() === STATUSES.DOWN || mouseStatus.left() === STATUSES.SWITCHING) {
        mouseStatus.right(STATUSES.SWITCHING);
        mouseStatus.left(STATUSES.SWITCHING);

        chrome.extension.sendMessage({
          event: 'next'
        });
      }
    }
  });

  document.addEventListener('mouseup', function(event) {
    var previousStatus;
    if (event.button === BUTTONS.LEFT) {
      previousStatus = mouseStatus.left();
      mouseStatus.left(STATUSES.UP);
    } else if (event.button === BUTTONS.RIGHT) {
      previousStatus = mouseStatus.right();
      mouseStatus.right(STATUSES.UP);
    }

    if (previousStatus === STATUSES.SWITCHING) {
      event.preventDefault();
      event.stopPropagation();
      mouseEventGroup(event).belongsToSwitch = true;
    }
  });

  document.addEventListener('contextmenu', function(event) {
    if (mouseEventGroup(event).belongsToSwitch) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
});