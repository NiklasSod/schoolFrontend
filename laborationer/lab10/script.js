const drawBtn = document.getElementById('drawBtn');
const cardDiv = document.getElementById('card');

let card = [];

const getCard = async() => {
  const res = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
  const data = await res.json();
  card.push(data);
};

const createCard = () => {
  let latestDraw = card.length - 1;
  createCardText(latestDraw);
  createCardImg(latestDraw);
};

const createCardImg = (latestDraw) => {
  let img = card[latestDraw].cards[0].image;
  let cardImg = document.createElement('img');
  cardImg.classList.add('cardImg');
  cardImg.src = img;
  cardDiv.appendChild(cardImg);
};

const createCardText = (latestDraw) => {
  let suit = card[latestDraw].cards[0].suit;
  let value = card[latestDraw].cards[0].value;
  let text = `${value} OF ${suit}`;
  let cardText = document.createElement('p');
  cardText.classList.add('cardText');
  cardText.innerText = text;
  cardDiv.appendChild(cardText);
};

drawBtn.addEventListener("click", async(e) => {
  e.preventDefault();
  cardDiv.innerHTML = '';
  await getCard();
  createCard();
  console.log(card); //TEMP
});
