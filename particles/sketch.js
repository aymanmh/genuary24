// an array to add multiple particles
let particles = [];

function setup() {
  colorMode(HSB, 360, 100, 100, 100)
  createCanvas(800, 600);
  for(let i = 0;i<width/3;i++){
  //for(let i = 0;i<2;i++){
    particles.push(new Particle());
  }
}

function draw() {
  background('#0f0f0f');
  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
  }
}