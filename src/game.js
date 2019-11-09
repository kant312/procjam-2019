import {Point, Color, Renderer} from './renderer';
import {Genes} from './genes';
import {CharacterFactory, Character} from './character';
import {EggFactory, Egg} from './egg';
import {randomiser} from './randomiser';
import {Menu} from './menu';

export const sketch = (sketch) => {
  const WIDTH = 1024;
  const HEIGHT = 768;
  const FPS = 30;

  let isPause = false;

  function World(width, height, random) {
    this.width = width;
    this.height = height;
    this.random = random;
  }

  let world;
  let renderer;

  const characters = [];
  let characterFactory;

  const eggs = [];
  let eggFactory;

  let genes;
  let random = randomiser(sketch);

  let menu;

  function addCharacter(origin, genes) {
    characters.push(characterFactory.make(origin, genes));
  }

  function generateNewGenes() {
    genes = Genes.make(random);
    menu.setGenes(genes);
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

  sketch.mouseClicked = () => {
    addEgg(new Point(sketch.mouseX, sketch.mouseY));
  }

  sketch.keyPressed = () => {
    console.debug('Pressed key: ' + sketch.keyCode);
    if (sketch.keyCode === 80) {
      isPause = !isPause;
    } else if(sketch.keyCode === 88) {
      generateNewGenes();
    } else if(sketch.keyCode === sketch.ENTER) {
      addCharacter(new Point(sketch.mouseX, sketch.mouseY), genes);
    }
  }

  sketch.setup = () => {
    world = new World(WIDTH, HEIGHT, random);
    renderer = new Renderer(sketch, WIDTH, HEIGHT, FPS);
    genes = Genes.make(random);
    menu = new Menu(world, renderer);
    menu.setGenes(genes);

    characterFactory = new CharacterFactory(world, renderer);
    eggFactory = new EggFactory(world, renderer);
  }

  sketch.draw = () => {
    if (isPause) {
      return;
    }

    renderer.clear();

    [].concat(eggs,characters).forEach(c => {
      c.update();
      c.draw();
    });

    renderer.text('Current population: [' + characters.length + ']', new Point(10, HEIGHT - 10), new Color(128,128,128));
    
    menu.draw();
    
    const mousePosition = new Point(sketch.mouseX, sketch.mouseY);
    const hoveredCharacter = characters
    .filter(function(c) { return c.isCollidingWith(mousePosition) })
    .find(function() { return true; });
    if (hoveredCharacter !== undefined) {
      renderer.text('Name: ' + hoveredCharacter.name, new Point(10, 26), new Color(0,0,33));
    }
  }
};