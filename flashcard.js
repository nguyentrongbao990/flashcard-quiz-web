function createDeck(title, description) {
  const decks = getDecks();

  const newDeck = {
    id: Date.now(),
    title: title,
    description: description,
    cards: []
  };

  decks.push(newDeck);
  saveDecks(decks);
}

function getDeckById(deckId) {
  const decks = getDecks();
  return decks.find(deck => deck.id === Number(deckId)) || null;
}

function addCardToDeck(deckId, front, back) {
  const decks = getDecks();
  const deck = decks.find(d => d.id === Number(deckId));

  if (!deck) return false;

  const newCard = {
    id: Date.now(),
    front: front,
    back: back
  };

  deck.cards.push(newCard);
  saveDecks(decks);
  return true;
}