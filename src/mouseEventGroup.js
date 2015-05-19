var eventGroups = [];
var nextId = 0;
var EVENT_GROUP_MAX_LIFETIME = 2000;
var EVENT_GROUP_VALID_RANGE = 50;

var eventTriggers = {
  mousedown: 'mousedown',
  click: 'mouseup',
  contextmenu: 'mouseup',
  dblclick: 'mouseup',
  mouseup: 'mouseup'
};

function MouseEventGroup(event) {
  this.events = [event];

  this.earliestTimeStamp = event.timeStamp;
  this.button = event.button;
  this.trigger = eventTriggers[event.type];

  this.id = nextId++;
}

MouseEventGroup.prototype.shouldIncludeEvent = function shouldIncludeEvent(event) {
  var sameButton = this.button === event.button;
  var sameTrigger = this.trigger === eventTriggers[event.type];
  var validTime = event.timeStamp - this.earliestTimeStamp <= EVENT_GROUP_VALID_RANGE;

  return sameButton && sameTrigger && validTime;
};

function cleanupOldEventGroups() {
  var latestTimeStamp = eventGroups.reduce(function(a, b) {
    return a.earliestTimeStamp > b.earliestTimeStamp ? a : b;
  }).earliestTimeStamp;

  eventGroups = eventGroups.filter(function(group) {
    return latestTimeStamp - group.earliestTimeStamp < EVENT_GROUP_MAX_LIFETIME;
  });
}

function mouseEventGroup(event) {
  var eventGroup = eventGroups.filter(function(group) {
    return group.shouldIncludeEvent(event);
  })[0];

  if (eventGroup) {
    eventGroup.events.push(event);
  } else {
    eventGroup = new MouseEventGroup(event);
    eventGroups.push(eventGroup);
    cleanupOldEventGroups();
  }

  return eventGroup;
}