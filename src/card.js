"use strict";

module.exports = exports = Card;

function Card(index, location) {
    this.idx = index;
    this.position = {x: 10, y: 10};
    this.suit = Math.floor(index / 13);
    this.isRed = (this.suit == 1 || this.suit == 3);
    this.turned = false;
    this.value = index - 13*(Math.floor(index / 13));
    this.img = new Image();
    this.location = location;
}

Card.prototype.update = function(elapsedTime) {
    if(this.turned) this.img.src = "assets/" + this.idx + ".png";
    else this.img.src = "assets/back.png";
}

Card.prototype.render = function(ctx, elapsedTime) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.drawImage(this.img,0,0,100,140);
    ctx.restore();
}