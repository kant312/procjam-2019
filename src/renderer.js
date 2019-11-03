function Point(x, y) {
  this.x = x;
  this.y = y;
}

function Color(h, s, b, a = 1) {
  this.h = h;
  this.s = s;
  this.b = b;
  this.a = a;
}

function Renderer()
{
  loadFont('fonts/pico8.ttf', function(font) {
    textFont(font);
    this.font = font;
  }, error => console.log(error));  
}

Renderer.prototype.fill = function(c) {
  fill(c.h, c.s, c.b, c.a);
}

Renderer.prototype.stroke = function(c) {
  stroke(c.h, c.s, c.b, c.a);
}

Renderer.prototype.rect = function(width, height) {
  rect(0, 0, width, height);
}

Renderer.prototype.ellipse = function(width, height) {
  ellipse(0, 0, width, height);
}

Renderer.prototype.triangle = function(p1, p2, p3) {
  triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
}

Renderer.prototype.translate = function(p) {
  translate(p.x, p.y);
}

Renderer.prototype.bezierVertex = function(p1, p2, p3) {
  bezierVertex(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
}

Renderer.prototype.beginShape = function() {
  beginShape();
}

Renderer.prototype.endShape = function() {
  endShape();
}

Renderer.prototype.vertex = function(p) {
  vertex(p.x, p.y);
}

Renderer.prototype.push = function() {
  push();
}

Renderer.prototype.pop = function() {
  pop();
}

Renderer.prototype.scale = function(p) {
  scale(p.x, p.y)
}

Renderer.prototype.rotate = function(r) {
  rotate(r)
}

Renderer.prototype.text = function(content, p) {
  this.push();
  textSize(18);
  this.fill(new Color(128,128,128));
  text(content, p.x, p.y);
  this.pop();
}