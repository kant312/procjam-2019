function Genes(genes) {
  this.bodyColor = genes.bodyColor;
  this.isTransparent = genes.isTransparent;
  this.size = genes.size;
}

Genes.prototype.make = function() {
  return new Genes({
    bodyColor: new Color(random(255), random(220), random(220)),
    isTransparent: (Math.random() > 0.8),
    size: 0.5 + Math.random()
  })
}