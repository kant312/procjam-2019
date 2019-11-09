import {Color} from './renderer';

export class Genes {
  
  constructor(genes) {
    this.bodyColor = genes.bodyColor;
    this.isTransparent = genes.isTransparent;
    this.size = genes.size;
  }

  static make(random) {
    return new Genes({
      bodyColor: new Color(random(255), random(220), random(220)),
      isTransparent: (random(10) > 5),
      size: 0.5 + (random(10)/10)
    })
  }
}
