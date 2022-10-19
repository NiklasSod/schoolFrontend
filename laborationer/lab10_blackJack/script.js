let startBtn = document.getElementById("startBtn");
let restartBtn = document.getElementById("restartBtn");
let stopBtn = document.getElementById("stopBtn");
let rules = document.getElementById("rules");
let dealerHand = document.getElementById("dealerHand");
let playerHand = document.getElementById("playerHand");
let gameInfo = document.getElementById("gameInfo");
let dealerInfo = document.getElementById("dealerInfo");
let playerInfo = document.getElementById("playerInfo");
let currencyDiv = document.getElementById("currencyDiv");

import { fetchedCards, getDecks } from "./javascript/fetch.js"; 
import { createDealerCardBack, showDealerSecretCard } from "./javascript/functions.js";

const reshuffleNumber = 80;
let usedCards = [];
let cards = [];
export let dealerSecretCard = [];
let dealerPoints = 0;
let dealerAce = [];
let playerPoints = 0;
let playerAce = [];
let roundsPlayed = 0;
let playerCurrency = 100;

startBtn.disabled = true; // enables again after all cards are loaded
getDecks(); // on page load

/**
 * FUNCTIONS
 */

const roundStart = () => {
  dealerCardBack();
  playerCard();
  dealerCard();
  playerCard();
};

const dealerCardBack = () => {
  createDealerCardBack();
  dealerSecretCard.push(cards[0]);
  putCardInUsedCardArray("dealer");
};

const playerCard = () => {
  createCard(playerHand);
  putCardInUsedCardArray("player");
  if (!checkPlayerPoints()) {
    if (playerPoints === 21) return roundCompleteInfo(true);
    roundCompleteInfo(false);
  }
};

const dealerCard = () => {
  createCard(dealerHand);
  putCardInUsedCardArray("dealer");
};

const putCardInUsedCardArray = (person) => {
  usedCards.push(cards[0]);
  const cardValue = cards[0].value;
  cards.shift();
  calculateValue(person, cardValue);
};

// person is dealer or player
const createCard = (personHand) => {
  let cardImg = document.createElement("img");
  cardImg.classList.add("cardImg");
  let img = cards[0].image;
  cardImg.src = img;
  personHand.appendChild(cardImg);
};

// person is dealer or player
const calculateValue = (person, value) => {
  switch (value) {
    case "ACE":
      person === "dealer" ? (dealerPoints += 11) : (playerPoints += 11);
      person === "dealer" ? dealerAce.push(1) : playerAce.push(1);
      break;
    case "JACK":
      person === "dealer" ? (dealerPoints += 10) : (playerPoints += 10);
      break;
    case "QUEEN":
      person === "dealer" ? (dealerPoints += 10) : (playerPoints += 10);
      break;
    case "KING":
      person === "dealer" ? (dealerPoints += 10) : (playerPoints += 10);
      break;
    default:
      person === "dealer"
        ? (dealerPoints += parseInt(value, 10))
        : (playerPoints += parseInt(value, 10));
      break;
  }
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

const checkDealerPoints = () => {
  if (dealerPoints > 21) {
    if (dealerAce.length > 0) {
      dealerAce.pop();
      dealerPoints -= 10;
    }
  }
};

const roundCompleteInfo = (value) => {
  gameInfo.classList.remove("hide");
  stopBtn.classList.add("hide");
  if (value) {
    announceStatusToUser("WINNER", "+");
    return;
  }
  announceStatusToUser("You lost", "-");
};

const announceStatusToUser = (text, calc) => {
  showPoints(text);
  calc === "+" ? playerCurrency += 10 : playerCurrency -= 10;
  currencyDiv.innerText = `Currency: ${playerCurrency}`;
  showDealerSecretCard();
  nextGame();
};

const showPoints = (text) => {
  dealerInfo.innerText = `Dealer: ${dealerPoints}`;
  gameInfo.innerText = text;
  playerInfo.innerText = `You: ${playerPoints}`;
};

const nextGame = () => {
  startBtn.innerText = "Go again";
  resetScore();
  rechuffleCards();
  checkPlayerCurrency();
};

const rechuffleCards = () => {
  if (cards.length < reshuffleNumber) {
    for (let i = usedCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [usedCards[i], usedCards[j]] = [usedCards[j], usedCards[i]];
    }
    usedCards.forEach(e => {
      cards.push(e);
    });
  }
};

const checkPlayerCurrency = () => {
  if (playerCurrency <= 0) {
    gameOver();
  }
};

const gameOver = () => {
  startBtn.disabled = true;
  startBtn.classList.add("hide");
  gameInfo.innerText += ` - GAME OVER - you played ${roundsPlayed} rounds`;
};

const resetScore = () => {
  dealerSecretCard.length = 0;
  dealerPoints = 0;
  dealerAce.length = 0;
  playerPoints = 0;
  playerAce.length = 0;
};

const resetDivs = () => {
  dealerHand.innerText = "";
  playerHand.innerText = "";
  gameInfo.classList.add("hide");
  gameInfo.innerText = "";
  dealerInfo.innerText = "";
  playerInfo.innerText = "";
};

/**
 * EVENT LISTENERS
 */

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (cards.length === 0) {
    cards = [...fetchedCards];
  }
  if (startBtn.innerText === "Go again") {
    resetDivs();
  }
  rules.classList.add("hide");
  startBtn.innerText = "Draw card";
  stopBtn.classList.remove("hide");
  if (dealerPoints === 0) {
    roundsPlayed++;
    roundStart();
    return;
  }
  if (checkPlayerPoints()) return playerCard();
});

restartBtn.addEventListener("click", (e) => {
  location.reload();
});

stopBtn.addEventListener("click", (e) => {
  e.preventDefault();
  stopBtn.classList.add("hide");
  while (dealerPoints < 17) {
    dealerCard();
    checkDealerPoints();
  }
  if (dealerPoints > 21) return roundCompleteInfo(true);
  if (dealerPoints === playerPoints) return roundCompleteInfo(true);
  if (dealerPoints > playerPoints) return roundCompleteInfo(false);
  roundCompleteInfo(true);
});
