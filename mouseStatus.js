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

function defaultMouseStatus() {
  return {
    left: STATUSES.UP,
    right: STATUSES.UP
  };
}
