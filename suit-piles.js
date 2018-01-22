class SuitPile {

  constructor(idx, ctx) {
      this.cards = [];
      this.suitNum = idx;
      this.position = { x: 922, y: 10 + idx * 150 };
  }

  push(card) {
      card.position.x = this.position.x;
      card.position.y = this.position.y;
      card.location = this.suitNum.toString();
      this.cards.push(card);
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
