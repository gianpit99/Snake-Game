var len = 698;
var wid = 698;
var speed = 21;
var score = 0;
var comp = [];

function setup() {
  frameRate(20);
  clear();
  createCanvas(len, wid, WEBGL);
  background(255);
  fill(200, 200, 200, 50);

  player = new Body();
  fruit = new Fruit();
  move = new Coordinate_chain();
}

function draw() {
  background(255);

  fill(0, 0, 0, 255);
  rect(-len/2, -wid/2, len, 2);
  rect(-len/2, wid/2, len, -2);
  rect(-len/2, -wid/2, 2, wid);
  rect(len/2, wid/2, -2, -wid);


  fruit.render();
  move.chain();
  player.render();

  if ((abs(player.head.x_coord) >= 343) || (abs(player.head.y_coord) >= 343)) {
    player.head.x_coord = 0;
    player.head.y_coord = 0;
    player.dir.x = 0;
    player.dir.y = 0;
  }

  for (var x = 1; x <= score; x++) {
    var component = comp[x];
    component.x_coord = move.coords[x][0];
    component.y_coord = move.coords[x][1];
    component.render();
  }


  if ((abs(player.head.x_coord - fruit.pos.x) <= 5) && (abs(player.head.y_coord - fruit.pos.y) <= 5)) {
    fruit = new Fruit();
    score++;
    comp[score] = new Lim();
    move.track++;
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

  this.dir = createVector(0, 0);

  this.render = function() {
    this.head.render();
    this.head.x_coord += this.dir.x;
    this.head.y_coord += this.dir.y;
  }
}

function Lim() {
  this.x_coord = 0;
  this.y_coord = 0;

  this.render = function() {

    fill(0, 128, 0, 255);
    rect((-10 + this.x_coord), (-10 + this.y_coord), 21, 21);
    fill(0, 0, 0, 255);
    rect((-10 + this.x_coord), (-10 + this.y_coord), 2, 21);
    rect((11 + this.x_coord), (-10 + this.y_coord), -2, 21);
    rect((-10 + this.x_coord), (-10 + this.y_coord), 21, 2);
    rect((-10 + this.x_coord), (11 + this.y_coord), 21, -2);
  }
}

function Coordinate_chain() {
  this.track = 0;
  this.coords = [];
  this.temp_x;
  this.temp_y;
  this.temp_xx;
  this.temp_yy;

  for (var x = 0; x <= 100; x++) {
    this.coords[x] = [];
  }

  this.chain = function() {
    this.temp_x = this.coords[0][0];
    this.temp_y = this.coords[0][1];
    this.coords[0][0] = player.head.x_coord;
    this.coords[0][1] = player.head.y_coord;

    for (var x = 1; x <= this.track; x++) {
      this.temp_xx = this.coords[x][0];
      this.temp_yy = this.coords[x][1];

      this.coords[x][0] = this.temp_x;
      this.coords[x][1] = this.temp_y;

      this.temp_x = this.temp_xx;
      this.temp_y = this.temp_yy;
    }
  }
}

function Fruit() {
  this.occu = true;

  while (this.occu == true) {
    this.pos = createVector(Math.round(random(-15, 15))*21, Math.round(random(-15, 15))*21);
    this.count = 0;
    for (var x = 0; x < score; x++) {
      this.temp_1 = move.coords[x][0];
      this.temp_2 = move.coords[x][1];
      if ((this.pos.x == this.temp_1) && (this.pos.y == this.temp_2)) {
        this.count++;
      }
    }
    if (this.count == 0) {
      this.occu = false;
    }
  }
  this.occu = true;

  this.render = function() {
    fill(128, 0, 0, 255);
    rect((-10 + this.pos.x), (-10 + this.pos.y), 21, 21);
    fill(0, 0, 0, 255);
    rect((-10 + this.pos.x), (-10 + this.pos.y), 2, 21);
    rect((11 + this.pos.x), (-10 + this.pos.y), -2, 21);
    rect((-10 + this.pos.x), (-10 + this.pos.y), 21, 2);
    rect((-10 + this.pos.x), (11 + this.pos.y), 21, -2);
  }
}
