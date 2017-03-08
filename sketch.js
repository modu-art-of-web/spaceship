var movers = [];

var G = 1;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (var i = 0; i < 10; i++) {
    movers[i] = new Mover(random(0, 3), random(width), random(height));
  }
}

function draw() {
  background(51);
  analyser.getByteFrequencyData(dataArray);
  var sum = 0;
  for (var i=0, j = dataArray.length; i < j; i ++){
    sum += dataArray[i];
  }

  var avg = sum / 128;

  G = avg / 10;

  for (var i = 0; i < movers.length; i++) {
    for (var j = 0; j < movers.length; j++) {
      if (i !== j) {
        var force = movers[j].calculateAttraction(movers[i]);
        movers[i].applyForce(force);
      }
    }

    movers[i].update();
    // movers[i].checkEdges();
    movers[i].display();

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

  analyser.fftSize = 256;
  analyser.connect(audioCtx.destination);
  source.connect(analyser);
  audio.crossOrigin = "anonymous";

var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

play('https://soundcloud.com/keljet-tapes/tape-ten');
