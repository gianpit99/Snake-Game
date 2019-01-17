

function setup() {
  clear();
  createCanvas(500, 500, WEBGL);
  background(255);
  fill(200, 200, 200, 50)
  body = new Body();
  
}

function draw() {
  background(255);
  //boarder
  fill(0, 0, 0, 255);
  rect(-250, -250, 500, 2);
  rect(-250, 250, 500, -2);
  rect(-250, -250, 2, 500);
  rect(250, 250, -2, -500);
}

function Lim(){
  
}

function Body(){
  
  
  
  
}
