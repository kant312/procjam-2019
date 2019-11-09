import {Color, Point} from './renderer';

export class CharacterFactory {
  constructor(world, renderer) {
    this.w = world;
    this.r = renderer;
  }

  make(origin, genes) {
    return new Character(this.w, this.r, origin, genes);
  }
}

export class Character {
  constructor(world, renderer, origin, genes) {

    this.w = world;
    this.r = renderer;
    this.location = origin;
    this.genes = genes;
    this.width = 40 + this.w.random(5);
    this.height = 40 + this.w.random(5);
    this.minHeight = 40;
    this.maxHeight = 48;
    this.size = 0.5 + genes.size;
    this.beakLength = genes.beakLength;
    this.maxSize = 1.5;
    this.speed = (this.w.random(10) > 5) 
      ? (this.w.random(10) > 5) 
      ? 3
      : 2
      : 1;
    this.age = 0;
    this.name = this.generateName();
    this.maxAge = 120;
    this.bodyColor = (genes.bodyColor !== undefined) ? genes.bodyColor : new Color(this.w.random(255), this.w.random(180), this.w.random(220));
    this.bodyColor.a = genes.isTransparent ? 0.5 : 1;
    this.eyeColor = new Color(this.w.random(255), this.w.random(255), this.r.max(100, this.w.random(255)));
    this.beakColor = new Color(this.w.random(255), this.w.random(255), this.r.max(100, this.w.random(255)));
    this.direction = (this.w.random(10) > 5) ? 1 : -1;
  }

  update() {
    this.location = new Point(this.location.x += this.speed *this.direction, this.location.y);
    if (this.location.x <= 0 || this.location.x >= this.w.width) {
      this.direction *= -1;
    }
    let newHeight = this.height + ((this.w.random(10) > 5) ? 0.5 : -0.5);
    this.height = this.r.max(this.r.min(newHeight, this.maxHeight), this.minHeight);
    this.location.y += (this.w.random(10) > 5) ? 1 : -1;
    if (this.size < this.maxSize) {
      this.size += 0.0001;
    }
  
    if (this.age < this.maxAge) {
      this.age += 0.1;
    }
  }
  
  isCollidingWith(p) {
    const realWidth = (this.width*this.size);
    const realHeight = (this.height*this.size);
    return p.x >= (this.location.x - realWidth) && p.x <= (this.location.x + realWidth)
      && p.y >= (this.location.y - realHeight) && p.y <= (this.location.y + realHeight);
  };
  
  draw() {
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
    this.r.triangle(new Point(0, -8), new Point(0, 8), new Point(this.beakLength * this.direction, 3));
    this.r.pop();
  
    this.r.pop();
  }
  
  generateName() {
    const syllables = [
      'much',
      'ke',
      'ja',
      'il',
      'ton',
      'bu',
      'prr',
      'sta',
      'dada',
      'tin',
      'to',
      'kel',
      'al',
      'su',
      'tro',
      'po',
      'can',
      'brek',
      'chez',
      'bed',
      'pil',
    ];

    const nbSyllables = 1 + Math.ceil(this.w.random(4));

    const name = (new Array(nbSyllables))
      .fill('')
      .map(() => {
        return syllables[Math.floor(this.w.random(syllables.length))];
      }).join('');

    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
