import {Color, Point} from './renderer';
import {Egg, EggFactory} from './egg';

export class Menu {
  constructor(world, renderer) {
    this.w = world;
    this.r = renderer;
    this.eggFactory = new EggFactory(this.w, this.r);
    this.height = 64;
  }

  setGenes(genes) {
    this.genes = genes;
    this.egg = this.eggFactory.make(new Point(this.w.width/2, 56), genes);
    this.egg.setSize(.3);
  }

  draw() {
    this.r.push();
    this.r.translate(new Point(0,0));
    this.r.fill(new Color(120,32,255));
    this.r.rect(this.w.width, this.height);

    this.r.text('Current egg', new Point(this.w.width/2, 20), new Color(0,0,33), this.r.ALIGN_CENTER);
    this.egg.draw();

    this.r.pop();
  }
}