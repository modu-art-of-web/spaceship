// var sound = require('./sound');

// console.log("@@@@@", sound());

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  b1 = color('#485563');
  b2 = color('#29323c');

  physics=new VerletPhysics2D();
  physics.setWorldBounds(new Rect(0,0,width,height));
  cluster = new Cluster(8, 100, new Vec2D(width/2, height/2));

}

function draw() {
  setGradient(0, 0, windowWidth, windowHeight, b1, b2, X_AXIS);
  var frqSUM = soundcloud.frequencySUM();
  spaceship(frqSUM / 512)
}
function spaceship(frqAVG) {
  if (frqAVG > 40) {
    showPhysics = !showPhysics;
    if (!showPhysics) showParticles = true;
  } else if (frqAVG > 20) {
    showParticles = !showParticles;
    if (!showParticles) showPhysics = true;
  } else if (frqAVG > 10) {
    physics.clear();
    cluster = new Cluster(Math.floor(random(2, floor(frqAVG))), random(10, height-100), new Vec2D(width/2, height/2));
  }
  physics.update();
  if (showParticles) {
    cluster.display();
  }
  if (showPhysics) {
    cluster.showConnections();
  }
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }
  else if (axis == X_AXIS) {  // Left to right gradient
    for (var i = x; i <= x+w; i++) {
      var inter = map(i, x, x+w, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  cluster = new Cluster(8, 100, new Vec2D(width/2, height/2));
}

function colorAlpha(aColor, alpha) {
  var c = color(aColor);
  return color('rgba(' +  [red(c), green(c), blue(c), alpha].join(',') + ')');
}

var physics;
var cluster;

var showPhysics = true;
var showParticles = true;
var Y_AXIS = 1;
var X_AXIS = 2;
var b1, b2;


var audio = document.querySelectorAll('.audio-player')[0]
  , soundcloud = sound(audio)
  , deepshower = 'https://soundcloud.com/vegastripseoul/deepshower-replay-feat-jeebanoff';

soundcloud.search(deepshower, function(streamUrl, artworkUrl){
  soundcloud.play(streamUrl);
}, function(err){
  console.log(err);
});



