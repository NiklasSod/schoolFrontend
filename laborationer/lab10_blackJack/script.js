let startBtn = document.getElementById('startBtn');
let restartBtn = document.getElementById('restartBtn');
let dealerHand = document.getElementById('dealerHand');
let playerHand = document.getElementById('playerHand');
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
  // console.log('All cards');
  // console.log(cards);
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
  let dealerValue = dealerCardBack();
  calculateValue('dealer', dealerValue);
  let playerValue = playerFirstCard();
  calculateValue('player', playerValue);
  // console.log(dealerPoints)
  // console.log(dealerAce)
  // console.log(playerPoints)
  // console.log(playerAce)
};

const dealerCardBack = () => {
  let cardBackImg = document.createElement('img');
  cardBackImg.classList.add('cardBackImg');
  cardBackImg.src = cardBack;
  dealerHand.appendChild(cardBackImg);
  dealerSecretCard.push(cards[0]);
  usedCards.push(cards[0]);
  const cardValue = cards[0].value;
  // console.log('dealerSecretCard');
  // console.log(dealerSecretCard);
  cards.shift();
  return cardValue;
};

const calculateValue = (person, value) => {
  switch(value) {
    case "ACE":
      person === 'dealer' ? dealerPoints = 14 : playerPoints = 14;
      person === 'dealer' ? dealerAce.push(1) :  playerAce.push(1);
      break;
    case "JACK":
      person === 'dealer' ? dealerPoints = 10 : playerPoints = 10;
      break;
    case "QUEEN":
      person === 'dealer' ? dealerPoints = 10 : playerPoints = 10;
      break;
    case "KING":
      person === 'dealer' ? dealerPoints = 10 : playerPoints = 10;
      break;
    default:
      person === 'dealer' ? dealerPoints = parseInt(value, 10) : playerPoints = parseInt(value, 10);
      break;
  };
};

const playerFirstCard = () => {
  let cardImg = document.createElement('img');
  cardImg.classList.add('cardImg');
  let img = cards[0].image;
  cardImg.src = img;
  playerHand.appendChild(cardImg);
  const cardValue = cards[0].value;
  return cardValue;
};

startBtn.addEventListener('click', (e) => {
  e.preventDefault();
  startBtn.innerText = 'Draw card';
  roundStart();
});

restartBtn.addEventListener('click', (e) => {
  location.reload();
});
