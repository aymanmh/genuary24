
const canvasWidth = 600; 
const canvasHeight = 600;

let seedPoints = [];
let delaunay;
let angle;
let incChange;
let scale;

let pointsCount = 500;
let angleSlider;
let colorSlider;

let animateCheckbox;
let animate = false;

let curveCheckbox;
let curve = true;

function setup() 
{
  resetButton = createButton('Reset');
  resetButton.mouseClicked(generatePoints);

  angleSliderLabel = createDiv('Angle'); 
  angleSlider = createSlider(137, 138,137.2,0.05);
  angleSlider.mouseClicked(generatePoints);
  angleSlider.parent(angleSliderLabel);

  incSliderLabel = createDiv('Increment');
  incSlider = createSlider(0, 4,1,0.05);
  incSlider.mouseClicked(generatePoints);
  incSlider.parent(incSliderLabel);
  

  zoomSliderLabel = createDiv('Zoom');
  scaleSlider = createSlider(1, 20,12,0.5);
  scaleSlider.mouseClicked(generatePoints);
  scaleSlider.parent(zoomSliderLabel);

  colorSliderLabel = createDiv('Color');
  colorSlider = createSlider(0.1, 2,1.5,0.1);
  colorSlider.mouseClicked(generatePoints);
  colorSlider.parent(colorSliderLabel);

  animateCheckbox = createCheckbox('Animate', animate);
  animateCheckbox.changed( () => { animate = !animate; } );

  curveCheckbox = createCheckbox('Curved Lines', curve);
  curveCheckbox.changed( () => { curve = !curve; } );

  //noLoop();
  colorMode(HSB, 360, 100, 100, 100)
  createCanvas(canvasWidth, canvasHeight);

  generatePoints();
}

function generatePoints()
{
  angle = angleSlider.value();
  incChange = incSlider.value();
  scale = scaleSlider.value();

  //console.log(angle);
  let n = 0;
  seedPoints = [];
  for (let i = 0; i < pointsCount; i++) {
    let ang = radians(n * angle);
    let r = scale * sqrt(n);

    let x = r * sin(ang) + width/2;
    let y = r * cos(ang) + height/2;

    n += incChange;

    seedPoints.push(x, y);
  }
  //console.log(seedPoints.length)
}


function draw()
{

  delaunay = new d3.Delaunay(seedPoints);

  background(90)

 // let {points, triangles} = delaunay;
  //noFill();
  strokeWeight(0);
  /*
  for (let i = 0; i < triangles.length; i+=3) {
    let a = 2 * delaunay.triangles[i];
    let b = 2 * delaunay.triangles[i+1];
    let c = 2 * delaunay.triangles[i+2];

    triangle(points[a], points[a+1], points[b], points[b+1], points[c], points[c+1]);
  }
*/

  let voronoi = delaunay.voronoi([0,0,width,height]);
  let polygons = voronoi.cellPolygons();
  let c = 1;
  colorInc = colorSlider.value();
  for (const poly of polygons) 
  {
    beginShape();
    fill(c%360,100,100);
    for (let i = 0; i < poly.length; i++) {
      if(curve)
        curveVertex((poly[i][0]), poly[i][1])
      else
        vertex((poly[i][0]), poly[i][1])

    }
    endShape(CLOSE);
    c += colorInc;
  }

  if(!animate)
    return;

  for(let i = 0; i < pointsCount*2 ; i +=2)
  {
    //stroke(0);
    //strokeWeight(3);
    //point(seedPoints[i],seedPoints[i+1])
  
    seedPoints[i] += random(-1,1);
    seedPoints[i+1] += random(-1,1);
  }

}
