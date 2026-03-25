let currentDeckId = null;
let studyDeck = null;
let currentCardIndex = 0;
let isFlipped = false;

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

function renderDeckList() {
    const decks = getDecks();
    const deckList = document.getElementById("deckList");

    deckList.innerHTML = "";

    decks.forEach(deck => {
        const deckCard = document.createElement("div");
        deckCard.className = "card mb-3";

        deckCard.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${deck.title}</h5>
        <p class="card-text text-muted">${deck.description}</p>
        <p class="card-text">Số thẻ: ${deck.cards.length}</p>
        <button class="btn btn-outline-primary btn-sm me-2" onclick="renderDeckDetail(${deck.id})">Xem chi tiết</button>
        <button class="btn btn-outline-warning btn-sm me-2" onclick="startStudyMode(${deck.id})">Học</button>
        <button class="btn btn-outline-success btn-sm" onclick="startQuiz(${deck.id})">Quiz</button>
      </div>
    `;

        deckList.appendChild(deckCard);
    });
}

function getDeckById(deckId) {
    const decks = getDecks();
    return decks.find(deck => deck.id === Number(deckId));
}

function renderDeckDetail(deckId) {
    const deck = getDeckById(deckId);

    if (!deck) return;

    currentDeckId = deck.id;

    const titleDisplay = document.getElementById("deckTitleDisplay");
    const descriptionDisplay = document.getElementById("deckDescriptionDisplay");
    const cardList = document.getElementById("cardList");

    titleDisplay.textContent = deck.title;
    descriptionDisplay.textContent = deck.description || "Không có mô tả";

    cardList.innerHTML = "";

    if (deck.cards.length === 0) {
        cardList.innerHTML = "<li>Chưa có flashcard nào trong bộ này.</li>";
        return;
    }

    deck.cards.forEach(card => {
        const li = document.createElement("li");
        li.textContent = `${card.front} - ${card.back}`;
        cardList.appendChild(li);
    });
}

function addCardToDeck(deckId, front, back) {
    const decks = getDecks();
    const deck = decks.find(d => d.id === Number(deckId));

    if (!deck) return;

    const newCard = {
        id: Date.now(),
        front: front,
        back: back
    };

    deck.cards.push(newCard);
    saveDecks(decks);
}

function startStudyMode(deckId) {
  const deck = getDeckById(deckId);

  if (!deck) return;

  if (deck.cards.length === 0) {
    alert("Bộ thẻ này chưa có flashcard");
    return;
  }

  studyDeck = deck;
  currentCardIndex = 0;
  isFlipped = false;

  renderCurrentCard();
}

function renderCurrentCard() {
  if (!studyDeck || studyDeck.cards.length === 0) return;

  const currentCard = studyDeck.cards[currentCardIndex];
  const cardCounter = document.getElementById("cardCounter");
  const flashcardDisplay = document.getElementById("flashcardDisplay");

  cardCounter.textContent = `Thẻ ${currentCardIndex + 1}/${studyDeck.cards.length}`;

  if (isFlipped) {
    flashcardDisplay.textContent = currentCard.back;
  } else {
    flashcardDisplay.textContent = currentCard.front;
  }
}