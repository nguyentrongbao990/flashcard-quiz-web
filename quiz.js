let quizDeck = null;
let currentQuizIndex = 0;
let score = 0;

function startQuiz(deckId) {
  const deck = getDeckById(deckId);

  if (!deck) return;

  if (deck.cards.length === 0) {
    alert("Bộ thẻ này chưa có flashcard");
    return;
  }

  quizDeck = deck;
  currentQuizIndex = 0;
  score = 0;

  renderQuizQuestion();
}

function renderQuizQuestion() {
  if (!quizDeck || quizDeck.cards.length === 0) return;

  const quizContainer = document.getElementById("quizContainer");

  if (currentQuizIndex >= quizDeck.cards.length) {
    renderQuizResult();
    return;
  }

  const currentCard = quizDeck.cards[currentQuizIndex];

  quizContainer.innerHTML = `
    <div class="card">
      <div class="card-body">
        <p class="text-muted mb-2">Câu ${currentQuizIndex + 1}/${quizDeck.cards.length}</p>
        <h5 class="card-title mb-3">${currentCard.front}</h5>
        <input type="text" id="quizAnswer" class="form-control mb-3" placeholder="Nhập đáp án">
        <button class="btn btn-primary" onclick="submitQuizAnswer()">Nộp câu trả lời</button>
      </div>
    </div>
  `;

  const resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = "";
}

function submitQuizAnswer() {
  if (!quizDeck) return;

  const answerInput = document.getElementById("quizAnswer");
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = quizDeck.cards[currentQuizIndex].back.trim().toLowerCase();

  if (!userAnswer) {
    alert("Vui lòng nhập đáp án");
    return;
  }

  if (userAnswer === correctAnswer) {
    score++;
  }

  currentQuizIndex++;
  renderQuizQuestion();
}

function renderQuizResult() {
  const quizContainer = document.getElementById("quizContainer");
  const resultContainer = document.getElementById("resultContainer");

  const total = quizDeck.cards.length;
  const wrong = total - score;
  const percent = ((score / total) * 100).toFixed(0);

  quizContainer.innerHTML = "";
  resultContainer.innerHTML = `
    <div class="alert alert-info">
      <h5>Kết quả quiz</h5>
      <p class="mb-1">Tổng số câu: ${total}</p>
      <p class="mb-1">Số câu đúng: ${score}</p>
      <p class="mb-1">Số câu sai: ${wrong}</p>
      <p class="mb-0">Tỷ lệ đúng: ${percent}%</p>
    </div>
  `;
}