document.addEventListener("DOMContentLoaded", function () {
  initSampleData();
  renderDeckList();

  const createDeckBtn = document.getElementById("createDeckBtn");
  const addCardBtn = document.getElementById("addCardBtn");
  const flipBtn = document.getElementById("flipBtn");
  const nextBtn = document.getElementById("nextBtn");

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

  addCardBtn.addEventListener("click", function () {
    if (!currentDeckId) {
      alert("Vui lòng chọn một bộ thẻ trước");
      return;
    }

    const frontInput = document.getElementById("cardFront");
    const backInput = document.getElementById("cardBack");

    const front = frontInput.value.trim();
    const back = backInput.value.trim();

    if (!front || !back) {
      alert("Vui lòng nhập đầy đủ mặt trước và mặt sau");
      return;
    }

    addCardToDeck(currentDeckId, front, back);
    renderDeckDetail(currentDeckId);
    renderDeckList();

    frontInput.value = "";
    backInput.value = "";
  });

  flipBtn.addEventListener("click", function () {
    if (!studyDeck) {
      alert("Vui lòng chọn chế độ học từ một bộ thẻ");
      return;
    }

    isFlipped = !isFlipped;
    renderCurrentCard();
  });

  nextBtn.addEventListener("click", function () {
    if (!studyDeck) {
      alert("Vui lòng chọn chế độ học từ một bộ thẻ");
      return;
    }

    if (currentCardIndex < studyDeck.cards.length - 1) {
      currentCardIndex++;
      isFlipped = false;
      renderCurrentCard();
    } else {
      alert("Đã hết flashcard trong bộ này");
    }
  });
});