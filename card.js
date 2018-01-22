class Card {
  constructor(index, location) {
      this.idx = index;
      this.position = {x: 10, y: 10, z: 0};
      this.suit = Math.floor(index / 13);
      this.isRed = (this.suit == 1 || this.suit == 3);
      this.turned = false;
      this.value = index - 13*(Math.floor(index / 13));
      this.img = new Image();
      this.location = location;
  }

  update(elapsedTime) {
      if(this.turned) this.img.src = "assets/" + this.idx + ".png";
      else this.img.src = "assets/back.png";
  }

  render(ctx, elapsedTime) {
      ctx.save();
      ctx.translate(this.position.x, this.position.y);
      ctx.drawImage(this.img,0,0,100,140);
      ctx.restore();
  }
}
