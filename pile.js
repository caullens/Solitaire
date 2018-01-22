class Pile {
  constructor() {
      this.cards = [];
      this.position = { x: 10, y: 160 };
      this.padding = 13;
  }

  push(card) {
      card.position.x = this.position.x;
      card.location = "pile";
      this.cards.push(card);
      this.cards[this.cards.length - 1].position.y = (this.cards.length - 1) * this.padding + this.position.y;
  }

  add(cards) {
      let self = this;
      cards.forEach(function (card) {
          card.position.x = self.position.x;
          card.position.y = (self.cards.length) * 34 + 10;
      });
      this.cards.concat(cards);
  }

  pop() {
      return this.cards.pop();
  }

  remove(idx) {
      return this.cards.splice(0, idx);
  }

  update(elapsedTime) {
      let self = this;
      this.cards.forEach(function (card) {
          card.update(elapsedTime);
      });
  }

  render(elapsedTime, ctx) {
      let self = this;
      this.cards.forEach(function (card) {
          card.render(ctx, elapsedTime);
      });
  }
}
