function Point(x, y) {
  this.x = x;
  this.y = y;
}

function Color(h, s, b) {
  this.h = h;
  this.s = s;
  this.b = b;
}

function Renderer()
{

}

Renderer.prototype.fill = function(c, o = 1) {
  fill(c.h, c.s, c.b, o);
}

Renderer.prototype.stroke = function(c) {
  stroke(c.h, c.s, c.b);
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