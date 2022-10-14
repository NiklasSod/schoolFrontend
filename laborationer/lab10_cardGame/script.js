const drawDeckBtn = document.getElementById('drawDeckBtn');
const drawCardBtn = document.getElementById('drawCardBtn');
const cardDiv = document.getElementById('card');
const restartBtn = document.getElementById('restartBtn');
const showUsedCardsBtn = document.getElementById('showUsedCardsBtn');
const cardBack = './cardback.png';

let cards = [];
let usedCards = [];
let usedCardsInfo = '';
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
  showCardBack();
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

const showCardBack = () => {
  let cardBackImg = document.createElement('img');
  cardBackImg.classList.add('cardBackImg');
  cardBackImg.src = cardBack;
  cardDiv.appendChild(cardBackImg);
};

const createCard = () => {
  let latestDraw = cards.length - 1;
  createCardText(latestDraw);
  const loadedImg = createCardImg(latestDraw);
  addCardToDrawPile();
  loadedImg.onload = (e) => {
    showLastCardsUsed();
  };
};

const createCardImg = (latestDraw) => {
  let cardImg = document.createElement('img');
  cardImg.classList.add('cardImg');
  let img = cards[latestDraw].image;
  cardImg.src = img;
  cardDiv.appendChild(cardImg);
  return cardImg;
};

const createCardText = (latestDraw) => {
  let suit = cards[latestDraw].suit;
  let value = cards[latestDraw].value;
  let text = `${value} OF ${suit}`;
  if (usedCards.length === 0) {
    usedCardsInfo = '';
  };
  usedCardsInfo += text + '. ';
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

const showLastCardsUsed = () => {
  let showDrawNr = document.createElement('p');
  showDrawNr.innerText = `Cards drawn: ${usedCards.length} cards`;
  showDrawNr.classList.add('drawPile');
  cardDiv.appendChild(showDrawNr);
};

const showAllCardsUsed = () => {
  let updatedText = updateText();
  console.log(updatedText)
  let showUsedCardsInfo = document.createElement('p');
  showUsedCardsInfo.innerHTML = updatedText;
  cardDiv.appendChild(showUsedCardsInfo);
};

const restartDrawGame = async() => {
  usedCards.length = 0;
  await getDeck();
};

const updateText = () => {
  let updatedText = usedCardsInfo
    .replaceAll('HEARTS', '&hearts;')
    .replaceAll('CLUBS', '&clubs;')
    .replaceAll('SPADES', '&spades;')
    .replaceAll('DIAMONDS', '&diams;')
    .replaceAll('KING', 'K')
    .replaceAll('QUEEN', 'Q')
    .replaceAll('JACK', 'J')
    .replaceAll('ACE', 'A')
    .replaceAll(' OF ', '');
    return updatedText;
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
  console.log(usedCards.length)
  if (usedCards.length === 52) {
    drawCardBtn.disabled = true;
    drawCardBtn.style.textDecoration = 'line-through';
    return;
  };
  if (usedCards.length === 52) {
    await restartDrawGame();
  };
  if (cards.length === 0) {
    await getCard();
  };
  cardDiv.innerHTML = '';
  createCard();
  showUsedCardsBtn.removeAttribute('class');
  showUsedCardsBtn.setAttribute('class', 'used__cards__btn')
  showUsedCardsBtn.disabled = false;
});

restartBtn.addEventListener('click', async(e) => {
  e.preventDefault();
  window.location.reload();
});

showUsedCardsBtn.addEventListener('click', (e) => {
  showAllCardsUsed();
  showUsedCardsBtn.disabled = true;
});
