let startBtn = document.getElementById('startBtn');
let restartBtn = document.getElementById('restartBtn');
let stopBtn = document.getElementById('stopBtn');
let dealerHand = document.getElementById('dealerHand');
let playerHand = document.getElementById('playerHand');
let gameInfo = document.getElementById('gameInfo');
const cardBack = './cardback.png';

let cards = [];
let usedCards = [];
let dealerSecretCard = [];
let dealerPoints = 0;
let dealerAce = [];
let playerPoints = 0;
let playerAce = [];

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
getDecks();

const roundStart = () => {
  dealerCardBack();
  playerCard();
  dealerFrontCard();
  playerCard();
};

const dealerCardBack = () => {
  let cardBackImg = document.createElement('img');
  cardBackImg.classList.add('cardBackImg');
  cardBackImg.setAttribute('id', 'cardBackImg');
  cardBackImg.src = cardBack;
  dealerHand.appendChild(cardBackImg);
  dealerSecretCard.push(cards[0]);
  usedCards.push(cards[0]);
  const cardValue = cards[0].value;
  cards.shift();
  calculateValue('dealer', cardValue);
};

const dealerFrontCard = () => {
  let cardImg = document.createElement('img');
  cardImg.classList.add('cardImg');
  let img = cards[0].image;
  cardImg.src = img;
  dealerHand.appendChild(cardImg);
  usedCards.push(cards[0]);
  const cardValue = cards[0].value;
  cards.shift();
  calculateValue('dealer', cardValue);
};

const playerCard = () => {
  let cardImg = document.createElement('img');
  cardImg.classList.add('cardImg');
  let img = cards[0].image;
  cardImg.src = img;
  playerHand.appendChild(cardImg);
  usedCards.push(cards[0]);
  const cardValue = cards[0].value;
  cards.shift();
  calculateValue('player', cardValue);
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
  startBtn.classList.add('hide');
  stopBtn.classList.add('hide');
  if (value) {
    gameInfo.innerText = 'WINNER';
    return;
  };
  gameInfo.innerText = 'You lost';
};

const showDealerSecretCard = () => {
  document.getElementById('cardBackImg').remove();
  let cardImg = document.createElement('img');
  cardImg.classList.add('cardImg');
  let img = dealerSecretCard[0].image;
  cardImg.src = img;
  dealerHand.appendChild(cardImg);
};

startBtn.addEventListener('click', (e) => {
  e.preventDefault();
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
  startBtn.classList.add('hide');
  stopBtn.classList.add('hide');
  showDealerSecretCard();
  console.log(dealerPoints)

  while (dealerPoints < 17) {
    dealerFrontCard();
    checkDealerPoints();
  };
  if (dealerPoints > 21) return roundCompleteInfo(true);
  if (dealerPoints === playerPoints) return roundCompleteInfo(true);
  if (dealerPoints > playerPoints) return roundCompleteInfo(false);
  roundCompleteInfo(true);
});
