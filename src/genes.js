import {Color} from './renderer';

export class Genes {
  
  constructor(genes) {
    this.bodyColor = genes.bodyColor;
    this.isTransparent = genes.isTransparent;
    this.size = genes.size;
    this.beakLength = genes.beakLength;
  }
  
  static make(random) {
    return new Genes({
      beakLength: 8 + random(8),
      bodyColor: new Color(random(255), random(220), random(220)),
      isTransparent: (random(10) > 9),
      size: 0.5 + (random(10)/10)
    })
  }
}
