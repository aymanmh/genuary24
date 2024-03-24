
const canvasWidth = 600; 
const canvasHeight = 600;

let myShape;

let myShape2 = new Shape();

let myShape3 = new Shape();
function setup() 
{
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100)
  createCanvas(canvasWidth, canvasHeight);

  myShape = new Shape();
}

function draw()
{
  noStroke();
  fill(25,100,100, frameCount%5);

  rect(0, 0,width*2, height*2);
  push();
  translate(width / 2, height / 2);

  rotate(frameCount%360);
  
  myShape.display();
  pop();

}
