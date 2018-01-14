(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/* Classes */
const Game = require('./game');
const Deck = require('./deck');
const Column = require('./column');
const SuitPile = require('./suit-piles');
const Pile = require('./pile');

/* Global variables */
var canvas = document.getElementById('screen');
var game = new Game(canvas, update, render);
var deck = new Deck();
deck.shuffle();
var columns = [];
for (var i = 0; i < 7; i++) {
  columns.push(new Column(i));
}
var suitPiles = [];
for (var i = 0; i < 4; i++) {
  suitPiles.push(new SuitPile(i));
}
var pile = new Pile();

dealStart();


/* Background Resources */
var base = new Image();
base.src = "assets/base.png";
var sBase = new Image();
sBase.src = "assets/sBase.png";
var hBase = new Image();
hBase.src = "assets/hBase.png";
var cBase = new Image();
cBase.src = "assets/cBase.png";
var dBase = new Image();
dBase.src = "assets/dBase.png";
var refresh = new Image();
refresh.src = "assets/refresh.png";

window.onmousedown = function (event) {
  console.log("Click detected")
  event.preventDefault();
}

canvas.onclick = function (event) {
  event.preventDefault();
  console.log(event.clientX,event.clientY);
  if (event.clientX < 117 && event.clientX > 10) {
    if (event.clientY < 227 && event.clientY > 10) {
      if (deck.deck.length < 1) {
        deck.add(pile.remove(pile.cards.length));
      }
      else pile.push(deck.deal(true));
    }
    if (event.clientY < pile.cards[pile.cards.length - 1].position.y + 140 && event.clientY > pile.cards[pile.cards.length - 1].position.y) {
      console.log(pile.cards[pile.cards.length - 1].position.y);
      if(findMoveLocation(pile.cards[pile.cards.length - 1])) pile.pop();
    }
  }
  //else if(event.clientX) {}
}

function findMoveLocation(card) {
  if(card.isRed) {
    if(card.value == 1) {
      suitPiles[card.suit].push(card);
      return true;
    }
  }
  else {

  }
}


var currentIndex, currentX, currentY;
canvas.onmousemove = function (event) {
}

/**
 * @function masterLoop
 * Advances the game in sync with the refresh rate of the screen
 * @param {DOMHighResTimeStamp} timestamp the current time
 */
var masterLoop = function (timestamp) {
  game.loop(timestamp);
  window.requestAnimationFrame(masterLoop);
}
masterLoop(performance.now());


/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {DOMHighResTimeStamp} elapsedTime indicates
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {
  deck.update(elapsedTime);
  columns.forEach(function (column) {
    column.update(elapsedTime);
  });
  suitPiles.forEach(function (suitPile) {
    suitPile.update(elapsedTime);
  });
  pile.update(elapsedTime);
}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {DOMHighResTimeStamp} elapsedTime indicates
  * the number of milliseconds passed since the last frame.
  * @param {CanvasRenderingContext2D} ctx the context to render to
  */
function render(elapsedTime, ctx) {
  renderBG(elapsedTime, ctx);
  deck.render(ctx, elapsedTime);
  columns.forEach(function (column) {
    column.render(elapsedTime, ctx);
  });
  suitPiles.forEach(function (suitPile) {
    suitPile.render(elapsedTime, ctx);
  });
  pile.render(elapsedTime, ctx);
}

function renderBG(elapsedTime, ctx) {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#006400";
  ctx.fillRect(0, 0, 123, canvas.height);
  ctx.fillRect(canvas.width - 123, 0, 123, canvas.height);
  ctx.drawImage(refresh, 10, 10, 100, 140);
  ctx.drawImage(base, canvas.width - 110, 10, 100, 140);
  ctx.drawImage(sBase, canvas.width - 85, 35, 49, 89)
  ctx.drawImage(base, canvas.width - 110, 160, 100, 140);
  ctx.drawImage(hBase, canvas.width - 85, 185, 49, 89)
  ctx.drawImage(base, canvas.width - 110, 310, 100, 140);
  ctx.drawImage(cBase, canvas.width - 85, 335, 49, 89)
  ctx.drawImage(base, canvas.width - 110, 460, 100, 140);
  ctx.drawImage(dBase, canvas.width - 85, 485, 49, 89);
}

function dealStart() {
  for (var i = 0; i < columns.length; i++) {
    for (var j = 0; j < i + 1; j++) {
      var card = deck.deal();
      if (j >= i) card.turned = true;
      columns[i].push(card);
    }
  }

}

},{"./column":3,"./deck":4,"./game":5,"./pile":6,"./suit-piles":7}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{"./card":2}],5:[function(require,module,exports){
"use strict";

/**
 * @module exports the Game class
 */
module.exports = exports = Game;

/**
 * @constructor Game
 * Creates a new game object
 * @param {canvasDOMElement} screen canvas object to draw into
 * @param {function} updateFunction function to update the game
 * @param {function} renderFunction function to render the game
 */
function Game(screen, updateFunction, renderFunction) {
  this.update = updateFunction;
  this.render = renderFunction;

  // Set up buffers
  this.frontBuffer = screen;
  this.frontCtx = screen.getContext('2d');
  this.backBuffer = document.createElement('canvas');
  this.backBuffer.width = screen.width;
  this.backBuffer.height = screen.height;
  this.backCtx = this.backBuffer.getContext('2d');

  // Start the game loop
  this.oldTime = performance.now();
  this.paused = false;
}

/**
 * @function pause
 * Pause or unpause the game
 * @param {bool} pause true to pause, false to start
 */
Game.prototype.pause = function(flag) {
  this.paused = (flag == true);
}

/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
Game.prototype.loop = function(newTime) {
  var game = this;
  var elapsedTime = newTime - this.oldTime;
  this.oldTime = newTime;

  if(!this.paused) this.update(elapsedTime);
  this.render(elapsedTime, this.frontCtx);

  // Flip the back buffer
  this.frontCtx.drawImage(this.backBuffer, 0, 0);
}

},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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
},{}]},{},[1]);
