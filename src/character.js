function CharacterFactory(world, renderer) {
  console.info('Created character factory', renderer);
  this.w = world;
  this.r = renderer;
}

CharacterFactory.prototype.make = function(origin, bodyColor) {
  return new Character(this.w, this.r, origin, bodyColor);
}

function Character(world, renderer, origin, bodyColor) {
  this.w = world;
  this.r = renderer;
  this.location = origin;
  this.width = 40 + random(5);
  this.height = 40 + random(5);
  this.minHeight = 40;
  this.maxHeight = 48;
  this.size = 0.5 + Math.random();
  this.maxSize = 1.5;
  this.speed = (Math.random() > 0.5) 
    ? (Math.random() > 0.5) 
    ? 3
    : 2
    : 1;
  this.bodyColor = (bodyColor !== undefined) ? bodyColor : new Color(random(255), random(180), random(220));
  this.eyeColor = new Color(random(255), random(255), max(100, random(255)));
  this.beakColor = new Color(random(255), random(255), max(100, random(255)));
  this.direction = (Math.random() > 0.5) ? 1 : -1;
}

Character.prototype.update = function() {
  this.location = new Point(this.location.x += this.speed *this.direction, this.location.y);
  if (this.location.x <= 0 || this.location.x >= this.w.width) {
    this.direction *= -1;
  }
  let newHeight = this.height + ((Math.random() > 0.5) ? 0.5 : -0.5);
  this.height = max(min(newHeight, this.maxHeight), this.minHeight);
  this.location.y += (Math.random() > 0.5) ? 1 : -1;
  if (this.size < this.maxSize) {
    this.size += 0.0001;
  }
}

Character.prototype.draw = function() {
  this.r.push();
  this.r.fill(this.bodyColor);
  this.r.translate(this.location);
  
  // Body

  this.r.scale(new Point(this.size, this.size));
  this.r.push();
  this.r.translate(new Point(-this.width/2, 0));
  this.r.ellipse(this.width, this.height);
  this.r.pop();
  
  // Eye
  this.r.push();
  this.r.translate(new Point(((this.width/2)-8)*this.direction, 4));
  this.r.fill(this.eyeColor);
  this.r.rect(3, 6);
  this.r.pop();

  // Beak
  this.r.push();
  this.r.translate(new Point(((this.width/2)-4)*this.direction, 18));
  this.r.fill(this.beakColor);
  this.r.triangle(new Point(0, -8), new Point(0, 8), new Point(8 * this.direction, 3));
  this.r.pop();

  this.r.pop();
}