document.addEventListener("DOMContentLoaded", function () {
  initSampleData();
  renderDeckList();

  const createDeckBtn = document.getElementById("createDeckBtn");

  createDeckBtn.addEventListener("click", function () {
    const titleInput = document.getElementById("deckTitle");
    const descriptionInput = document.getElementById("deckDescription");

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!title) {
      alert("Vui lòng nhập tên bộ thẻ");
      return;
    }

    createDeck(title, description);
    renderDeckList();

    titleInput.value = "";
    descriptionInput.value = "";
  });

});

let currentDeckId = null;

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
    deckCard.className = "col-xl-4 col-md-6 mb-4";

    deckCard.innerHTML = `
            <div class="inner-item">
                <h3 class="inner-title">${deck.title}</h3>

                <div class="inner-text">
                    <p class="inner-desc">${deck.description || "Không có mô tả"}</p>

                    <div class="inner-figure">
                        <i class="fa-regular fa-id-badge"></i>
                        <span>${deck.cards.length} thẻ</span>
                    </div>
                </div>

                <div class="inner-btn">
                    <button class="btn btn-1" onclick="renderDeckDetail(${deck.id})">Chi tiết</button>
                    <button class="btn btn-2" onclick="startStudyMode(${deck.id})">Học</button>
                    <button class="btn btn-3" onclick="startQuiz(${deck.id})">Câu đố</button>
                </div>
            </div>
        `;

    deckList.appendChild(deckCard);
  });
}

function getDeckById(deckId) {
  const decks = getDecks();
  return decks.find(deck => deck.id === Number(deckId));
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
