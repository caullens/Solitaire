"use strict";

const Card = require('./card');

module.exports = exports = Deck;

function Deck() {
    this.deck = populateDeck();
}

function populateDeck() {
    var temp = [];
    for (var i = 0; i < 52; i++) {
        temp.push(new Card(i + 1,"deck"));
    }
    return temp;
}

Deck.prototype.shuffle = function () {
    for (var i = 0; i < this.deck.length / 2; i++) {
        var idx = Math.floor(Math.random() * 26) + 26;
        var tmp = this.deck[i];
        this.deck[i] = this.deck[idx];
        this.deck[idx] = tmp;
    }
}

Deck.prototype.deal = function (turned) {
    this.deck[this.deck.length - 1].turned = turned;
    return this.deck.pop();
}

Deck.prototype.add = function (cards) {
    var self = this;
    cards.forEach(function (card) {
        self.deck.unshift(card);
        card.position.x = 10;
        card.position.y = 10;
        card.turned = false;
    });
}

Deck.prototype.update = function (elapsedTime) {
    this.deck.forEach(function (card) {
        card.update(elapsedTime);
    });
}

Deck.prototype.render = function (ctx, elaspedTime) {
    this.deck.forEach(function (card) {
        card.render(ctx, elaspedTime);
    });
}