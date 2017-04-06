var ball;
var width = window.innerWidth
, height = window.innerHeight;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  ball = new Ball(width / 2, height / 2, width / 5);
}

function draw() {
  background('#468966');

  ball.show();
}

function Ball(x, y, r) {
  this.pos = createVector(x, y);
  this.r = r;
  this.ctr = random(1000);

  this.show = function() {

    analyser.getByteFrequencyData(dataArray);
    var sum = 0;
    for (var i=0, j = dataArray.length; i < j; i ++){
      sum += dataArray[i];
    }

    var avg = sum / 64;
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