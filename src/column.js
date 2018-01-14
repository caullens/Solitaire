"use strict";

module.exports = exports = Column;

function Column(idx) {
    this.cards = [];
    this.colNum = idx;
    this.position = { x: 110 * idx + 135, y: 0 };
}

Column.prototype.push = function (card) {
    card.position.x = this.position.x;
    card.location = this.colNum.toString();
    this.cards.push(card);
    this.cards[this.cards.length - 1].position.y = (this.cards.length - 1) * 34 + 10;
}

Column.prototype.add = function (cards) {
    var self = this;
    cards.forEach(function (card) {
        card.position.x = self.position.x;
        card.position.y = (self.cards.length) * 34 + 10;
    });
    this.cards.concat(cards);
    console.log(this.cards);
}

Column.prototype.pop = function () {
    return this.cards.pop();
}

Column.prototype.remove = function (idx) {
    return this.cards.splice(0, idx);
}

Column.prototype.update = function (elapsedTime) {
    this.cards.forEach(function (card) {
        card.update(elapsedTime);
    });
}

Column.prototype.render = function (elapsedTime, ctx) {
    var self = this;
    this.cards.forEach(function (card) {
        card.render(ctx, elapsedTime);
    });
}