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
        emptyState.classList.remove("hidden");
        return;
    }

    emptyState.classList.add("hidden");

    deck.cards.forEach(card => {
        const cardItem = document.createElement("div");
        cardItem.className =
            "rounded-3xl bg-bgsoft p-5 ring-1 ring-blue-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md";

        cardItem.innerHTML = `
      <p class="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-textsub">Mặt trước</p>
      <h3 class="mb-4 text-xl font-bold text-textmain break-words">${escapeHtml(card.front)}</h3>

      <div class="mb-4 h-px bg-blue-100"></div>

      <p class="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-textsub">Mặt sau</p>
      <p class="text-base leading-7 text-textsub break-words">${escapeHtml(card.back)}</p>
    `;

        cardList.appendChild(cardItem);
    });
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}