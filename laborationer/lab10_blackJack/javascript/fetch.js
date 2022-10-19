let currencyDiv = document.getElementById("currencyDiv");

export let fetchedCards = [];

export const getDecks = async () => {
  const res = await fetch(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  let deck_id = data.deck_id;
  await getCards(deck_id);
};

const getCards = async (id) => {
  const res = await fetch(
    `https://deckofcardsapi.com/api/deck/${id}/draw/?count=312`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  for (let i = 0; i < data.cards.length; i++) {
    fetchedCards.push(data.cards[i]);
  }
  startBtn.disabled = false;
};
