document.addEventListener("DOMContentLoaded", function () {
    initSampleData();

    const currentDeckId = getCurrentDeckId();
    if (!currentDeckId) {
        window.location.href = "home.html";
        return;
    }

    const deck = getDeckById(currentDeckId);
    if (!deck) {
        window.location.href = "home.html";
        return;
    }

    const backToListBtn = document.getElementById("backToListBtn");
    const goToStudyBtn = document.getElementById("goToStudyBtn");
    const goToQuizBtn = document.getElementById("goToQuizBtn");
    const addCardBtn = document.getElementById("addCardBtn");

    renderDetailPage(currentDeckId);

    backToListBtn.addEventListener("click", function () {
        window.location.href = "home.html";
    });

    goToStudyBtn.addEventListener("click", function () {
        window.location.href = "study.html";
    });

    goToQuizBtn.addEventListener("click", function () {
        window.location.href = "quiz.html";
    });

    addCardBtn.addEventListener("click", function () {
        const frontInput = document.getElementById("cardFront");
        const backInput = document.getElementById("cardBack");

        const front = frontInput.value.trim();
        const back = backInput.value.trim();

        if (!front || !back) {
            alert("Vui lòng nhập đầy đủ mặt trước và mặt sau");
            return;
        }

        const added = addCardToDeck(currentDeckId, front, back);

        if (!added) {
            alert("Không thể thêm thẻ. Vui lòng thử lại.");
            return;
        }

        renderDetailPage(currentDeckId);

        frontInput.value = "";
        backInput.value = "";
        frontInput.focus();
    });
});

function renderDetailPage(deckId) {
    const deck = getDeckById(deckId);
    if (!deck) return;

    const deckTitleDisplay = document.getElementById("deckTitleDisplay");
    const deckDescriptionDisplay = document.getElementById("deckDescriptionDisplay");
    const cardCountBadge = document.getElementById("cardCountBadge");
    const emptyState = document.getElementById("emptyState");
    const cardList = document.getElementById("cardList");

    deckTitleDisplay.textContent = deck.title;
    deckDescriptionDisplay.textContent = deck.description || "Không có mô tả";
    cardCountBadge.textContent = `${deck.cards.length} thẻ`;

    cardList.innerHTML = "";

    if (deck.cards.length === 0) {
        emptyState.classList.remove("d-none");
        return;
    }

    emptyState.classList.add("d-none");

    deck.cards.forEach(card => {
        const cardItem = document.createElement("div");
        cardItem.className = "col-md-6";

        cardItem.innerHTML = `
      <div class="card h-100 border-0 shadow-sm rounded-4">
        <div class="card-body p-4">
          <p class="text-uppercase text-secondary fw-semibold small mb-2">Mặt trước</p>
          <h3 class="h4 fw-bold mb-4">${escapeHtml(card.front)}</h3>

          <hr>

          <p class="text-uppercase text-secondary fw-semibold small mb-2">Mặt sau</p>
          <p class="mb-0 text-muted">${escapeHtml(card.back)}</p>
        </div>
      </div>
    `;

        cardList.appendChild(cardItem);
    });
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}