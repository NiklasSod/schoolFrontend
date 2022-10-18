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

startBtn.disabled = true;
getDecks();

const roundStart = () => {
  dealerCardBack();
  playerCard();
};

const dealerCardBack = () => {
  let cardBackImg = document.createElement('img');
  cardBackImg.classList.add('cardBackImg');
  cardBackImg.src = cardBack;
  dealerHand.appendChild(cardBackImg);
  dealerSecretCard.push(cards[0]);
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

const roundCompleteInfo = (value) => {
  gameInfo.classList.remove("hide");
  if (value) {
    gameInfo.innerText = 'WINNER'
    return;
  };
  gameInfo.innerText = 'You lost'
};

startBtn.addEventListener('click', (e) => {
  e.preventDefault();
  startBtn.innerText = 'Draw card';
  if (dealerPoints === 0) {
    roundStart();
    return;
  };
  stopBtn.classList.remove("hide");
  if (checkPlayerPoints()) return playerCard();
});

restartBtn.addEventListener('click', (e) => {
  location.reload();
});

stopBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
});