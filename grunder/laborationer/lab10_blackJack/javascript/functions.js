const cardBack = "./cardback.png";

import { dealerSecretCard } from "../script.js";

export const createDealerCardBack = () => {
  let cardBackImg = document.createElement("img");
  cardBackImg.classList.add("cardBackImg");
  cardBackImg.setAttribute("id", "cardBackImg");
  cardBackImg.src = cardBack;
  dealerHand.appendChild(cardBackImg);
};

export const showDealerSecretCard = () => {
  document.getElementById("cardBackImg").remove();
  let cardImg = document.createElement("img");
  cardImg.classList.add("cardImg");
  let img = dealerSecretCard[0].image;
  cardImg.src = img;
  dealerHand.insertBefore(cardImg, dealerHand.firstChild);
};