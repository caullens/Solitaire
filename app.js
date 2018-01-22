/* Global variables */
let canvas = document.getElementById('screen');
const game = new Game(canvas, update, render);
let deck = new Deck();
deck.shuffle();
let columns = [];
for (let i = 0; i < 7; i++) {
  columns.push(new Column(i));
}
let suitPiles = [];
for (let i = 0; i < 4; i++) {
  suitPiles.push(new SuitPile(i));
}
let pile = new Pile();

dealStart();


/* Background Resources */
let base = new Image();
base.src = "assets/base.png";
let sBase = new Image();
sBase.src = "assets/sBase.png";
let hBase = new Image();
hBase.src = "assets/hBase.png";
let cBase = new Image();
cBase.src = "assets/cBase.png";
let dBase = new Image();
dBase.src = "assets/dBase.png";
let refresh = new Image();
refresh.src = "assets/refresh.png";

window.onmousedown = function (event) {
  event.preventDefault();
}

canvas.onclick = function (event) {
  event.preventDefault();
  if (event.clientX < 117 && event.clientX > 10) {
    if (event.clientY < 227 && event.clientY > 10) {
      if (deck.deck.length < 1) {
        deck.add(pile.remove(pile.cards.length));
      }
      else pile.push(deck.deal(true));
    }
    if (event.clientY < pile.cards[pile.cards.length - 1].position.y + 140 && event.clientY > pile.cards[pile.cards.length - 1].position.y) {
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


let currentIndex, currentX, currentY;
canvas.onmousemove = function (event) {
}

/**
 * @function masterLoop
 * Advances the game in sync with the refresh rate of the screen
 * @param {DOMHighResTimeStamp} timestamp the current time
 */
let masterLoop = function (timestamp) {
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
  for (let i = 0; i < columns.length; i++) {
    for (let j = 0; j < i + 1; j++) {
      let card = deck.deal();
      if (j >= i) card.turned = true;
      columns[i].push(card);
    }
  }

}
