function MouseStatus(options) {
  options = options || {};
  var that = this;

  var status;
  this.reset = function() {
    status = {
      left: STATUSES.UP,
      right: STATUSES.UP,
      switching: false,
      count: 0
    };

    return new Promise(function(resolve, reject) { 
      chrome.storage.local.set({mouseStatus: status}, function() {
        resolve();
      });
    });
  };

  this.ready = new Promise(function(resolve, reject) {
    chrome.storage.local.get('mouseStatus', function(items) {
      var mouseStatus = items.mouseStatus;
      if(mouseStatus && !options.resetSession) {
        status = mouseStatus;
        resolve(that);
      } else {
        that.reset().then(function() {
          resolve(that);
        });
      }

      chrome.storage.onChanged.addListener(function(changes, namespace) {
        if(changes['mouseStatus']) {
          status = changes['mouseStatus'].newValue;
        }
      });
    });
  });

  function accessor(property) {
    that[property] = function(value) {
      if(arguments.length === 0) {
        return status[property];
      } else {
        status[property] = value;
        chrome.storage.local.set({mouseStatus: status});
      }
    }
  }

  accessor('left');
  accessor('right');
  accessor('switching');
  accessor('count');
}

var STATUSES = {
  UP: 0,
  DOWN: 1,
  SWITCHING: 2
};

var BUTTONS = {
  LEFT: 0,
  RIGHT: 2
};
