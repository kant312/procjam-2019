const WIDTH = 1024;
const HEIGHT = 768;
const FPS = 30;

let isPause = false;

function World(width, height) {
  this.width = width;
  this.height = height;
}

const characters = [];
const characterFactory = new CharacterFactory(new World(WIDTH, HEIGHT), new Renderer());

function addCharacter(origin) {
  characters.push(characterFactory.make(origin));
}

function mouseClicked() {
  addCharacter(new Point(mouseX, mouseY));
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
  characters.forEach(c => {
    c.update();
    c.draw();
  });
}