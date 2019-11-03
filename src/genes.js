function Genes(genes) {
  this.bodyColor = genes.bodyColor;
  this.isTransparent = genes.isTransparent;
}

Genes.prototype.make = function() {
  return new Genes({
    bodyColor: new Color(random(255), random(220), random(220)),
    isTransparent: (Math.random() > 0.5)
  })
}