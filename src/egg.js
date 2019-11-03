function EggFactory(world, renderer) {
  this.w = world;
  this.r = renderer;
}

EggFactory.prototype.make = function(origin) {
  return new Egg(this.w, this.r, origin);
}

function Egg(world, renderer, origin) {
  this.w = world;
  this.r = renderer;
  this.position = origin;
  this.color = new Color(random(255), random(255), random(255));
  this.size = 0.1;
  this.growSpeed = 0.01;
  this.opacity = 1;
  this.maxSize = 1;
  this.listeners = [];
}

Egg.prototype.draw = function() {
  this.r.push();
  this.r.translate(new Point(this.position.x, this.position.y));
  this.r.fill(this.color, this.opacity);
  this.r.beginShape();
  this.r.vertex(new Point(0, -100));
  this.r.scale(new Point(this.size, this.size));
  this.r.bezierVertex(new Point(25, -100), new Point(40, -65), new Point(40, -40));
  this.r.bezierVertex(new Point(40, -15), new Point(25, 0), new Point(0, 0));
  this.r.bezierVertex(new Point(-25, 0), new Point(-40, -15), new Point(-40, -40));
  this.r.bezierVertex(new Point(-40, -65), new Point(-25, -100), new Point(0, -100));
  this.r.endShape();
  this.r.pop();
}

Egg.prototype.update = function() {
  if (this.size < this.maxSize) {
    this.size += this.growSpeed;
  } else if(this.opacity > 0) {
    this.opacity -= 0.01;
  } else {
    this.emit({
      name: 'hatched',
      target: this
    });
  }
}

Egg.prototype.addListener = function(listener) {
  this.listeners.push(listener);
};

Egg.prototype.emit = function(event) {
  this.listeners.forEach(function(listener) {
    listener(event);
  });
};