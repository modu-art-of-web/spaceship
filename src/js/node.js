function Node(pos) {
  VerletParticle2D.call(this,pos);
  this.display = function(){
    fill(255);
    stroke(255, 0.4);
    strokeWeight(2);
    ellipse(this.x,this.y,16,16);
  }
}
Node.prototype = Object.create(VerletParticle2D.prototype);
Node.prototype.constructor = Node;


