class Particle {
  constructor() {
    // this.vel = createVector(1, -1);
    this.x = random(0, width);
    this.y = random(0, height);
    this.r = random(2, 8);
    //this.xSpeed = random(-2, 2);
    //this.ySpeed = random(-1, 1.5);

    this.xSpeed = random(0, 7);
    this.ySpeed = random(0, 7);

    this.perimeter = random(10, 80);
    this.color = random(0, 360);
    this.originalColor = this.color;

    this.Ox = this.x;
    this.Oy = this.y;

    this.changeX = 0;
    this.changeY = 0;
  }

  // creation of a particle.
  createParticle() {
    noStroke();
    fill(this.color, 100, 100, 0);
    circle(this.x, this.y, this.r);
    //circle(this.x + this.changeX, this.y + this.changeY, this.r);
  }

  // setting the particle in motion.
  moveParticle() {
    //this.changeX = 100 * noise(0.005 * frameCount + this.x);
    //this.changeY = 100 * noise(0.005 * frameCount + 10000 + this.y);
    //this.changeX = noise(0.005 * Date.now() + this.Ox);
    //this.changeY = noise(0.005 * Date.now() + 10000 + this.Oy);
    let n1 = noise(0.0005 * Date.now() + this.Ox);
    let n2 = noise(0.0005 * Date.now() + 10000 + this.Oy);

    console.log(this.changeX)
   
    //controls pace of movement
    this.changeX = map(n1, 0 , 1,  -1 * this.xSpeed,this.xSpeed);
    this.changeY = map(n2, 0 , 1, -1 * this.ySpeed,this.ySpeed);

    this.x +=this.changeX;
    this.y +=this.changeY;

    if (this.x < 0 || this.x > width)
      this.xSpeed *= -1;
    if (this.y < 0 || this.y > height)
      this.ySpeed *= -1;

    //this.x += this.xSpeed + changeX;
    //this.y += this.ySpeed + changeY;
    //this.x += this.xSpeed + changeX;
    //this.y += this.ySpeed + changeY;
  }

  // this function creates the connections(lines)
  // between particles which are less than a certain distance apart
  joinParticles(particles) {
    particles.forEach(element => {
      let dis = dist(this.x, this.y, element.x, element.y);
      if (dis < this.perimeter) {
        color = random(0, 360);
        stroke(color,100,100,50);
        line(this.x, this.y, element.x, element.y);
        //element.color = this.color;
      }
      else {
       // element.color = element.originalColor;
      }
    });
  }
}