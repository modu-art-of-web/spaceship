function Butterfly(x, y) {
  var yoff = 0;
  this.x = x;
  this.y = y;
  
  this.show = function(avg) {
    translate(this.x, this.y);
    rotate(PI / 2);
    beginShape();
    // noStroke();
    stroke(255);
    fill(colorAlpha('#29323c', 0.5));
    // fill('#FFF0A5');
    strokeWeight(1);
  
    var da = PI / 100;
    var dx = 0.1;
  
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
  }
  
}