export function Point(x, y) {
  this.x = x;
  this.y = y;
}

export class Color {
  constructor(h, s, b, a = 1) {
    this.h = h;
    this.s = s;
    this.b = b;
    this.a = a;
  }
}

export class Renderer {
  constructor(sketch, width, height, fps) {
    this.sketch = sketch;
    this.width = width;
    this.height = height;
    this.fps = fps;

    this.ALIGN_CENTER = sketch.CENTER;
    this.ALIGN_LEFT = sketch.LEFT;
    this.ALIGN_RIGHT = sketch.RIGHT;

    this.sketch.loadFont('fonts/pico8.ttf', function(font) {
      this.sketch.textFont(font);
      this.font = font;
    }, error => console.log(error));  

    this.sketch.colorMode(this.sketch.HSB);
    this.sketch.angleMode(this.sketch.DEGREES);
    this.sketch.noStroke();
    this.sketch.ellipseMode(this.sketch.CORNER);
    this.sketch.createCanvas(this.width, this.height);
    this.sketch.frameRate(this.fps);
  }
  
  fill(c) {
    this.sketch.fill(c.h, c.s, c.b, c.a);
  }
  
  stroke(c) {
    this.sketch.stroke(c.h, c.s, c.b, c.a);
  }
  
  rect(width, height) {
    this.sketch.rect(0, 0, width, height);
  }
  
  ellipse(width, height) {
    this.sketch.ellipse(0, 0, width, height);
  }
  
  triangle(p1, p2, p3) {
    this.sketch.triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
  }
  
  translate(p) {
    this.sketch.translate(p.x, p.y);
  }
  
  bezierVertex(p1, p2, p3) {
    this.sketch.bezierVertex(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
  }
  
  beginShape() {
    this.sketch.beginShape();
  }
  
  endShape() {
    this.sketch.endShape();
  }
  
  vertex(p) {
    this.sketch.vertex(p.x, p.y);
  }
  
  push() {
    this.sketch.push();
  }
  
  pop() {
    this.sketch.pop();
  }
  
  scale(p) {
    this.sketch.scale(p.x, p.y)
  }
  
  rotate(r) {
    this.sketch.rotate(r)
  }
  
  text(content, p, c, align, textSize = 18) {
    this.push();
    align = (align === null) ? this.ALIGN_LEFT : align;
    this.sketch.textAlign(align);
    this.sketch.textSize(textSize);
    this.fill(c);
    this.sketch.text(content, p.x, p.y);
    this.pop();
  }

  clear() {
    this.sketch.clear();
  }

  min(a,b) {
    return this.sketch.min(a,b);
  }

  max(a,b) {
    return this.sketch.max(a,b);
  }
}