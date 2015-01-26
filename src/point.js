var DIRECTIONS = {
  LEFT: 'L',
  UP: 'U',
  DOWN: 'D',
  RIGHT: 'R'
};

function Point(event) {
  this.x = event.pageX;
  this.y = event.pageY;
}

Point.prototype.distanceFrom = function distanceFrom(other) {
  return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
};

Point.prototype.directionFrom = function directionFrom(other) {
  var angle = Math.atan2(this.y - other.y, this.x - other.x);

  if(angle >= (-3/4)*Math.PI && angle < (-1/4)*Math.PI) {
    return DIRECTIONS.UP;
  } else if(angle >= (-1/4)*Math.PI && angle < (1/4)*Math.PI) {
    return DIRECTIONS.RIGHT;
  } else if(angle >= (1/4)*Math.PI && angle < (3/4)*Math.PI) {
    return DIRECTIONS.DOWN;
  } else if(angle >= (3/4)*Math.PI || angle < (-3/4)*Math.PI) {
    return DIRECTIONS.LEFT;
  }
};