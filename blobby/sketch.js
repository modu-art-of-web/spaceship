var ball;
var width = window.innerWidth
, height = window.innerHeight;
var avg = 0;

var yoff = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  ball = new Ball(width / 2, height / 2, width / 5);
}

function draw() {

  analyser.getByteFrequencyData(dataArray);
  var sum = 0;
  for (var i=0, j = dataArray.length; i < j; i ++){
    sum += dataArray[i];
  }

  avg = sum / 8092;

  // background(51);
  background('#468966');
  translate(width / 2, height / 2);

  rotate(PI / 2);
  beginShape();
  noStroke();
  // stroke(255);
  // fill(255, 50);
  fill('#FFF0A5');
  strokeWeight(1);

  var da = PI / 100;
  var dx = 0.1

  var xoff = 0;
  for (var a = - PI/2; a <= PI/2;  a+= da ) {
    var n = noise(xoff, yoff);
    var r = sin(2 * a) * map(n, 0, 1, 50, 100); // pollar rose
    // var x = sin(frameCount * 0.01) * r * cos(a);
    var y = r * sin(a) * avg;
    var x = r * cos(a) * avg;
    // var y = sin(yoff) * r * sin(a);
    xoff += dx;

    // point(x, y);
    vertex(x, y);
    // r--;
  }
  // endShape();

  // beginShape();
  // var xoff = 0;
  for (var a = PI/2; a <= 3 * PI / 2;  a+= da ) {
    var n = noise(xoff, yoff);
    var r = sin(2 * a) * map(n, 0, 1, 50, 100);
    // var x = r * cos(a);
    // var x = sin(frameCount * 0.01) * r * cos(a);
    var y = r * sin(a) * avg;

    var x = r * cos(a) * avg;
    // var y = sin(yoff) * r * sin(a);
    xoff -= dx;

    // point(x, y);
    vertex(x, y);
    // r--;
  }
  endShape();

  yoff += 0.1;




  // ball.show();
}

function Ball(x, y, r) {
  this.pos = createVector(x, y);
  this.r = r;
  this.ctr = random(1000);

  this.show = function() {


    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill('#FFF0A5');
    beginShape();
    for (var a = 0; a < TWO_PI; a += PI / 100) {
      var cos_a = cos(a),
        sin_a = sin(a),
        // noise is symmetric about origin (move to 1,1)
        noi = noise(cos_a + 1, sin_a + 1, this.ctr),
        d = this.r + map(noi, 0, 1, -1 * avg, avg);
      // console.log(str);
      // console.log(d);
      vertex(d * cos_a, d * sin_a);
      // ellipse(d * cos_a, d * sin_a, 10, 10);
    }
    endShape();
    pop();
    this.ctr += 0.01;
  }
}

function play(track){
  SC.resolve(track)
  .then(function(data){
    var streamUrl = data.stream_url + '?client_id=' + client_id;
    audio.setAttribute('src', streamUrl);
    audio.play()
  }).catch(function(error){
    console.log(error);
  });
}


var client_id = '802c2f1c80c96881ff265799929e8a2c';

SC.initialize({
  client_id: client_id
});

var audio = document.querySelectorAll('.ctrgroup__player__audio')[0];
var audioCtx = new (window.AudioContext || window.webkitAudioContext)
  , source = audioCtx.createMediaElementSource(audio)
  , analyser = audioCtx.createAnalyser();

analyser.fftSize = 512;
analyser.connect(audioCtx.destination);
source.connect(analyser);
audio.crossOrigin = "anonymous";

var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

play('https://soundcloud.com/keljet-tapes-5/keljet-tape-eleven');