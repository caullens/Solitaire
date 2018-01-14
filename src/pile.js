"use strict";

module.exports = exports = Pile;

function Pile() {
    this.cards = [];
    this.position = { x: 10, y: 160 };
    this.padding = 13;
}

Pile.prototype.push = function (card) {
    card.position.x = this.position.x;
    card.location = "pile";
    this.cards.push(card);
    this.cards[this.cards.length - 1].position.y = (this.cards.length - 1) * this.padding + this.position.y;
}

Pile.prototype.add = function (cards) {
    var self = this;
    cards.forEach(function (card) {
        card.position.x = self.position.x;
        card.position.y = (self.cards.length) * 34 + 10;
    });
    this.cards.concat(cards);
}

Pile.prototype.pop = function () {
    return this.cards.pop();
}

Pile.prototype.remove = function (idx) {
    return this.cards.splice(0, idx);
}

Pile.prototype.update = function (elapsedTime) {
    var self = this;
    this.cards.forEach(function (card) {
        card.update(elapsedTime);
    });
}

Pile.prototype.render = function (elapsedTime, ctx) {
    var self = this;
    this.cards.forEach(function (card) {
        card.render(ctx, elapsedTime);
    });
}