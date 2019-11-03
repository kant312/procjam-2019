const WIDTH = 1024;
const HEIGHT = 768;
const FPS = 30;

let isPause = false;

function World(width, height) {
  this.width = width;
  this.height = height;
}

const world = new World(WIDTH, HEIGHT);
const renderer = new Renderer();

const characters = [];
const characterFactory = new CharacterFactory(world, renderer);

const eggs = [];
const eggFactory = new EggFactory(world, renderer);

function addCharacter(origin, bodyColor) {
  characters.push(characterFactory.make(origin, bodyColor));
}

function addEgg(origin) {
  const newEgg = eggFactory.make(origin);
  eggs.push(newEgg);
  newEgg.addListener(function(event) {
    const eggPosition = event.target.position;
    addCharacter(new Point(eggPosition.x, eggPosition.y - 50), event.target.color);
    eggs.splice(eggs.indexOf(event.target), 1);
  });
}

function mouseClicked() {
  //addCharacter(new Point(mouseX, mouseY));
  addEgg(new Point(mouseX, mouseY));
}

function keyPressed() {
  if (keyCode === 80) {
    isPause = !isPause;
  } else if(keyCode === ENTER) {
    addCharacter(new Point(mouseX, mouseY));
  }
}

function setup() {
  colorMode(HSB);
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
}