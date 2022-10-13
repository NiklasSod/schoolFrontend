const drawDeckBtn = document.getElementById('drawDeckBtn');
const drawCardBtn = document.getElementById('drawCardBtn');
const cardDiv = document.getElementById('card');
const restartBtn = document.getElementById('restartBtn');

let cards = [];
let usedCards = [];
let deck_id = '';

const getDeck = async() => {
  const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const data = await res.json();
  deck_id = data.deck_id;
};

const getCard = async() => {
  const res = await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=52`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const data = await res.json();
  for(let i = 0; i < data.cards.length; i++) {
    cards.push(data.cards[i]);
  };
};

const createCard = () => {
  let latestDraw = cards.length - 1;
  createCardText(latestDraw);
  createCardImg(latestDraw);
  addCardToDrawPile();
  showCardsUsed();
};

const createCardImg = (latestDraw) => {
  let img = cards[latestDraw].image;
  let cardImg = document.createElement('img');
  cardImg.classList.add('cardImg');
  cardImg.src = img;
  cardDiv.appendChild(cardImg);
};

const createCardText = (latestDraw) => {
  let suit = cards[latestDraw].suit;
  let value = cards[latestDraw].value;
  let text = `${value} OF ${suit}`;
  let cardText = document.createElement('p');
  cardText.classList.add('cardText');
  cardText.innerText = text;
  cardDiv.appendChild(cardText);
};

const addCardToDrawPile = () => {
  let drawn = cards.length - 1;
  usedCards.push(cards[drawn]);
  cards.pop();
};

const showCardsUsed = () => {
  let showDrawNr = document.createElement('p');
  showDrawNr.innerText = `Cards drawn: ${usedCards.length} cards`;
  showDrawNr.classList.add('drawPile');
  cardDiv.appendChild(showDrawNr);
};

const restartDrawGame = async() => {
  usedCards.length = 0;
  await getDeck();
};

drawDeckBtn.addEventListener("click", async(e) => {
  e.preventDefault();
  await getDeck();
  drawDeckBtn.innerHTML = 'Draw card';
  drawDeckBtn.setAttribute('class', 'hide');
  drawCardBtn.removeAttribute('class');
  drawCardBtn.setAttribute('class', 'draw__card__btn');
});

drawCardBtn.addEventListener('click', async(e) => {
  e.preventDefault();
  if (usedCards.length === 52) {
    await restartDrawGame();
  };
  if (cards.length === 0) {
    await getCard();
  };
  cardDiv.innerHTML = '';
  createCard();
  console.log(usedCards);
  console.log(cards);
});
