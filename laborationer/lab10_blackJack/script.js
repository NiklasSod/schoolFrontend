let startBtn = document.getElementById('startBtn');
let restartBtn = document.getElementById('restartBtn');
let stopBtn = document.getElementById('stopBtn');
let rules = document.getElementById('rules');
let dealerHand = document.getElementById('dealerHand');
let playerHand = document.getElementById('playerHand');
let gameInfo = document.getElementById('gameInfo');
let dealerInfo = document.getElementById('dealerInfo');
let playerInfo = document.getElementById('playerInfo');
let currencyDiv = document.getElementById('currencyDiv');
const cardBack = './cardback.png';

let cards = [];
let usedCards = [];
let dealerSecretCard = [];
let dealerPoints = 0;
let dealerAce = [];
let playerPoints = 0;
let playerAce = [];
let playerCurrency = 100;

const getDecks = async() => {
  const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const data = await res.json();
  deck_id = data.deck_id;
  await getCards(deck_id);
};

const getCards = async(id) => {
  const res = await fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=312`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const data = await res.json();
  for(let i = 0; i < data.cards.length; i++) {
    cards.push(data.cards[i]);
  };
  startBtn.disabled = false;
};

startBtn.disabled = true; // enables again after all cards are loaded
getDecks(); // on page load

const roundStart = () => {
  dealerCardBack();
  playerCard();
  dealerCard();
  playerCard();
};

const dealerCardBack = () => {
  createDealerCardBack();
  dealerSecretCard.push(cards[0]);
  putCardInUsedCardArray('dealer');
};

const createDealerCardBack = () => {
  let cardBackImg = document.createElement('img');
  cardBackImg.classList.add('cardBackImg');
  cardBackImg.setAttribute('id', 'cardBackImg');
  cardBackImg.src = cardBack;
  dealerHand.appendChild(cardBackImg);
};

const putCardInUsedCardArray = (person) => {
  usedCards.push(cards[0]);
  const cardValue = cards[0].value;
  cards.shift();
  calculateValue(person, cardValue);
};

const dealerCard = () => {
  createCard(dealerHand);
  putCardInUsedCardArray('dealer');
};

// person is dealer or player
const createCard = (personHand) => {
  let cardImg = document.createElement('img');
  cardImg.classList.add('cardImg');
  let img = cards[0].image;
  cardImg.src = img;
  personHand.appendChild(cardImg);
};

const playerCard = () => {
  createCard(playerHand);
  putCardInUsedCardArray('player');

  if (!checkPlayerPoints()) {
    if (playerPoints === 21) return roundCompleteInfo(true);
    roundCompleteInfo(false);
  };
};

const calculateValue = (person, value) => {
  switch(value) {
    case "ACE":
      person === 'dealer' ? dealerPoints += 11 : playerPoints += 11;
      person === 'dealer' ? dealerAce.push(1) :  playerAce.push(1);
      break;
    case "JACK":
      person === 'dealer' ? dealerPoints += 10 : playerPoints += 10;
      break;
    case "QUEEN":
      person === 'dealer' ? dealerPoints += 10 : playerPoints += 10;
      break;
    case "KING":
      person === 'dealer' ? dealerPoints += 10 : playerPoints += 10;
      break;
    default:
      person === 'dealer' ? dealerPoints += parseInt(value, 10) : playerPoints += parseInt(value, 10);
      break;
  };
};

const checkPlayerPoints = () => {
  if (playerPoints === 21) return false;
  if (playerPoints > 20) {
    if (playerAce.length > 0) {
      playerAce.pop();
      playerPoints -= 10;
      if (playerPoints === 21) return false;
      return true;
    }
    return false;
  }
  return true;
};

// TEMP checkPlayerPoints looks alot like checkDealerPoints...
const checkDealerPoints = () => {
  if (dealerPoints === 21) return false;
  if (dealerPoints > 20) {
    if (dealerAce.length > 0) {
      dealerAce.pop();
      dealerPoints -= 10;
      if (dealerPoints === 21) return false;
      return true;
    }
    return false;
  }
  return true;
};

const roundCompleteInfo = (value) => {
  gameInfo.classList.remove("hide");
  stopBtn.classList.add('hide');
  if (value) {
    showPoints('WINNER');
    playerCurrency += 10;
    currencyDiv.innerText = `Currency: ${playerCurrency}`;
    nextGame();
    return;
  };
  showPoints('You lost');
  playerCurrency -= 10;
  currencyDiv.innerText = `Currency: ${playerCurrency}`;
  nextGame();
};

const showPoints = (string) => {
  dealerInfo.innerText = `Dealer: ${dealerPoints}`;
  gameInfo.innerText = string;
  playerInfo.innerText = `You: ${playerPoints}`;
};

const showDealerSecretCard = () => {
  document.getElementById('cardBackImg').remove();
  let cardImg = document.createElement('img');
  cardImg.classList.add('cardImg');
  let img = dealerSecretCard[0].image;
  cardImg.src = img;
  dealerHand.appendChild(cardImg);
};

const nextGame = () => {
  startBtn.innerText = 'Go again';
  resetScore();
};

const resetScore = () => {
  dealerSecretCard.length = 0;
  dealerPoints = 0;
  dealerAce.length = 0;
  playerPoints = 0;
  playerAce.length = 0;
};

const resetDivs = () => {
  dealerHand.innerText = '';
  playerHand.innerText = '';
  gameInfo.classList.add("hide");
  gameInfo.innerText = '';
  dealerInfo.innerText = '';
  playerInfo.innerText = '';
};

startBtn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(cards.length)
  if (startBtn.innerText === 'Go again') {
    resetDivs();
  };
  rules.classList.add('hide');
  startBtn.innerText = 'Draw card';
  stopBtn.classList.remove("hide");
  if (dealerPoints === 0) {
    roundStart();
    return;
  };
  if (checkPlayerPoints()) return playerCard();
});

restartBtn.addEventListener('click', (e) => {
  location.reload();
});

stopBtn.addEventListener('click', (e) => {
  e.preventDefault();
  stopBtn.classList.add('hide');
  showDealerSecretCard();
  while (dealerPoints < 17) {
    dealerCard();
    checkDealerPoints();
  };
  if (dealerPoints > 21) return roundCompleteInfo(true);
  if (dealerPoints === playerPoints) return roundCompleteInfo(true);
  if (dealerPoints > playerPoints) return roundCompleteInfo(false);
  roundCompleteInfo(true);
});
