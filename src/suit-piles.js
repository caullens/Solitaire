"use strict";

module.exports = exports = SuitPile;

function SuitPile(idx, ctx) {
    this.cards = [];
    this.suitNum = idx;
    this.position = { x: 922, y: 10 + idx * 150 };
}

SuitPile.prototype.push = function (card) {
    card.position.x = this.position.x;
    card.position.y = this.position.y;
    card.location = this.suitNum.toString();
    this.cards.push(card);
}

SuitPile.prototype.add = function (cards) {
    var self = this;
    cards.forEach(function (card) {
        card.position.x = self.position.x;
        card.position.y = (self.cards.length) * 34 + 10;
    });
    this.cards.concat(cards);
    console.log(this.cards);
}

SuitPile.prototype.pop = function () {
    return this.cards.pop();
}

SuitPile.prototype.remove = function (idx) {
    return this.cards.splice(0, idx);
}

SuitPile.prototype.update = function (elapsedTime) {
    this.cards.forEach(function (card) {
        card.update(elapsedTime);
    });
}

SuitPile.prototype.render = function (elapsedTime, ctx) {
    var self = this;
    this.cards.forEach(function (card) {
        card.render(ctx, elapsedTime);
    });
}