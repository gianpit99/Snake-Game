var len = 724;
var wid = 724;
var speed = 10;
var start = true;

function setup() {
  frameRate(10);
  clear();
  createCanvas(len, wid, WEBGL);
  background(255);
  fill(200, 200, 200, 50);
  player = new Body();
  food = new Food();
}

function draw() {
  background(255);
  //boarder
  fill(0, 0, 0, 255);
  rect(-len/2, -wid/2, len, 2);
  rect(-len/2, wid/2, len, -2);
  rect(-len/2, -wid/2, 2, wid);
  rect(len/2, wid/2, -2, -wid);
  player.render();
  food.render();
  if ((player.pos.x == food.pos.x) && (player.pos.y == food.pos.y)) {
    food = new Food();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    player.dir.x = 0 * speed;
    player.dir.y = -1 * speed;
  } else if (keyCode === DOWN_ARROW) {
    player.dir.x = 0 * speed;
    player.dir.y = 1 * speed;
  } else if (keyCode === LEFT_ARROW) {
    player.dir.x = -1 * speed;
    player.dir.y = 0 * speed;
  } else if (keyCode === RIGHT_ARROW) {
    player.dir.x = 1 * speed;
    player.dir.y = 0 * speed;
  }
}

function Body() {
  this.head = new Lim();

  this.pos = createVector(0, 0);
  this.dir = createVector(0, 0);

  this.render = function() {
    this.update_pos();
    this.head.render();
  }
  this.update_pos = function() {
    this.head.pos.add(this.dir);
  }
}

function Lim() {
  this.pos = createVector(0, 0);

  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    fill(0, 0, 0, 255);
    rect(this.pos.x, this.pos.y, 20, 20);
    pop();
  }
}

function Food() {
  this.pos = createVector(random(-len/2, len/2) * 1, random(-wid/2, wid/2) * 1);
  this.render = function() { 
    fill(50, 50, 50, 100);
    rect(this.pos.x/2, this.pos.y/2, 20, 20);
  }
}
