import {Point, Color} from './renderer';

export class EggFactory {
  constructor(world, renderer) {
    this.w = world;
    this.r = renderer;
  }

  make(origin, genes) {
    return new Egg(this.w, this.r, origin, genes);
  }
}

export class Egg {
  constructor(world, renderer, origin, genes) {
    this.w = world;
    this.r = renderer;
    this.genes = genes;
    this.position = origin;
    this.color = new Color(this.genes.bodyColor.h, this.genes.bodyColor.s, this.genes.bodyColor.b);
    this.size = 0.1;
    this.growSpeed = 0.1;
    this.maxSize = 1;
    this.listeners = [];
  }

  draw() {
    this.r.push();
    this.r.translate(new Point(this.position.x, this.position.y + this.size));
    this.r.fill(this.color);
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
  
  update() {
    if (this.size < this.maxSize) {
      this.size += this.growSpeed;
    } else if(this.color.a > 0) {
      this.color.a -= 0.02;
    } else {
      this.emit({
        name: 'hatched',
        target: this
      });
    }
  }
  
  addListener(listener) {
    this.listeners.push(listener);
  };
  
  emit(event) {
    this.listeners.forEach(function(listener) {
      listener(event);
    });
  };
}
