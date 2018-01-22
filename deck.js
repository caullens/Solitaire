class Deck {

  constuctor() {
      this.deck = populateDeck();
  }

  populateDeck() {
      let temp = [];
      for (let i = 0; i < 52; i++) {
          temp.push(new Card(i + 1,"deck"));
      }
      return temp;
  }

  shuffle() {
      for (let i = 0; i < this.deck.length / 2; i++) {
          let idx = Math.floor(Math.random() * 26) + 26;
          let tmp = this.deck[i];
          this.deck[i] = this.deck[idx];
          this.deck[idx] = tmp;
      }
  }

  deal(turned) {
      this.deck[this.deck.length - 1].turned = turned;
      return this.deck.pop();
  }

  add(cards) {
      let self = this;
      cards.forEach(function (card) {
          self.deck.unshift(card);
          card.position.x = 10;
          card.position.y = 10;
          card.turned = false;
      });
  }

  update(elapsedTime) {
      this.deck.forEach(function (card) {
          card.update(elapsedTime);
      });
  }

  render(ctx, elaspedTime) {
      this.deck.forEach(function (card) {
          card.render(ctx, elaspedTime);
      });
  }
}
