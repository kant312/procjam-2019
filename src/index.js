const WIDTH = 1024;
const HEIGHT = 768;
const FPS = 30;

let isPause = false;

function World(width, height) {
  this.width = width;
  this.height = height;
}

let world;
let renderer;

const characters = [];
let characterFactory;

const eggs = [];
let eggFactory;

let genes;

function addCharacter(origin, genes) {
  characters.push(characterFactory.make(origin, genes));
}

function generateNewGenes() {
  genes = Genes.prototype.make();
}

function addEgg(origin) {
  const newEgg = eggFactory.make(origin, genes);
  eggs.push(newEgg);
  newEgg.addListener(function(event) {
    const eggPosition = event.target.position;
    addCharacter(new Point(eggPosition.x, eggPosition.y - 50), event.target.genes);
    eggs.splice(eggs.indexOf(event.target), 1);
  });
}

function mouseClicked() {
  addEgg(new Point(mouseX, mouseY));
}

function keyPressed() {
  console.debug('Pressed key: ' + keyCode);
  if (keyCode === 80) {
    isPause = !isPause;
  } else if(keyCode === 88) {
    generateNewGenes();
  } else if(keyCode === ENTER) {
    addCharacter(new Point(mouseX, mouseY));
  }
}

function preload() {
}

function setup() {
  world = new World(WIDTH, HEIGHT);
  renderer = new Renderer();
  genes = Genes.prototype.make();

  characterFactory = new CharacterFactory(world, renderer);
  eggFactory = new EggFactory(world, renderer);

  colorMode(HSB);
  angleMode(DEGREES);
  noStroke();
  ellipseMode(CORNER);
  createCanvas(WIDTH, HEIGHT);
  frameRate(FPS);
}

function draw() {
  if (isPause) {
    return;
  }

  clear();

  [].concat(eggs,characters).forEach(c => {
    c.update();
    c.draw();
  });

  renderer.text('Current population: [' + characters.length + ']', new Point(10, 750));
}