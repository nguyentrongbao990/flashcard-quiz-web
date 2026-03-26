let studyDeck = null;
let currentCardIndex = 0;
let isFlipped = false;

document.addEventListener("DOMContentLoaded", function () {
    initSampleData();

    let currentDeckId = getCurrentDeckId();
    if (!currentDeckId) {
        currentDeckId = 1;
        setCurrentDeckId(currentDeckId);
    }

    const deck = getDeckById(currentDeckId);
    if (!deck || deck.cards.length === 0) {
        alert("Bộ thẻ này chưa có flashcard.");
        window.location.href = "detail.html";
        return;
    }

    studyDeck = deck;
    currentCardIndex = 0;
    isFlipped = false;

    const backToDetailBtn = document.getElementById("backToDetailBtn");
    const flipBtn = document.getElementById("flipBtn");
    const nextBtn = document.getElementById("nextBtn");

    renderStudyCard();

    backToDetailBtn.addEventListener("click", function () {
        window.location.href = "detail.html";
    });

    flipBtn.addEventListener("click", function () {
        isFlipped = !isFlipped;
        renderStudyCard();
    });

    nextBtn.addEventListener("click", function () {
        if (currentCardIndex < studyDeck.cards.length - 1) {
            currentCardIndex++;
            isFlipped = false;
            renderStudyCard();
        } else {
            alert("Đã hết flashcard trong bộ này.");
        }
    });
});

function renderStudyCard() {
    if (!studyDeck || studyDeck.cards.length === 0) return;

    const currentCard = studyDeck.cards[currentCardIndex];

    const deckName = document.getElementById("deckName");
    const cardCounter = document.getElementById("cardCounter");
    const progressPercent = document.getElementById("progressPercent");
    const progressBar = document.getElementById("progressBar");
    const cardSideLabel = document.getElementById("cardSideLabel");
    const flashcardText = document.getElementById("flashcardText");

    deckName.textContent = studyDeck.title;
    cardCounter.textContent = `Thẻ ${currentCardIndex + 1} / ${studyDeck.cards.length}`;

    const percent = Math.round(((currentCardIndex + 1) / studyDeck.cards.length) * 100);
    progressPercent.textContent = `${percent}%`;
    progressBar.style.width = `${percent}%`;

    if (isFlipped) {
        cardSideLabel.textContent = "Mặt sau";
        flashcardText.textContent = currentCard.back;
    } else {
        cardSideLabel.textContent = "Mặt trước";
        flashcardText.textContent = currentCard.front;
    }
}