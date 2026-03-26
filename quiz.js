// ==========================================
// NGƯỜI 3: CODE XỬ LÝ LOGIC QUIZ VÀ KẾT QUẢ
// ==========================================

let quizDeck = null;
let currentQuizIndex = 0;
let score = 0;

// 1. Hàm bắt đầu Quiz
function startQuiz() {
    // Lấy ID bộ thẻ đang chọn (Sử dụng hàm getCurrentDeckId của Người 2 viết trong storage.js)
    const currentDeckId = getCurrentDeckId();
    
    // Bắt lỗi: Chưa chọn bộ thẻ
    if (!currentDeckId) {
        alert("Vui lòng chọn một bộ thẻ trước khi làm quiz!");
        return;
    }

    // Lấy chi tiết bộ thẻ (Sử dụng hàm getDecks của Người 2)
    const decks = getDecks();
    quizDeck = decks.find(deck => deck.id === Number(currentDeckId));

    if (!quizDeck) return;

    // Bắt lỗi: Bộ thẻ chưa có flashcard nào
    if (!quizDeck.cards || quizDeck.cards.length === 0) {
        alert("Bộ thẻ này chưa có flashcard nào. Hãy thêm thẻ trước khi làm Quiz!");
        return;
    }

    // Khởi tạo lại các biến trạng thái
    currentQuizIndex = 0;
    score = 0;

    // Gọi hàm hiển thị câu hỏi
    renderQuizQuestion();
}

// 2. Hàm hiển thị câu hỏi
function renderQuizQuestion() {
    // Gọi đúng ID rổ chứa mà Người 1 đã làm trong index.html
    const quizContainer = document.getElementById("quizContainer");
    const resultContainer = document.getElementById("resultContainer");
    
    // Xóa kết quả cũ nếu có
    if (resultContainer) resultContainer.innerHTML = "";

    // Kiểm tra nếu đã làm hết thẻ thì chuyển sang hiển thị kết quả
    if (currentQuizIndex >= quizDeck.cards.length) {
        renderQuizResult();
        return;
    }

    const currentCard = quizDeck.cards[currentQuizIndex];

    // Vẽ giao diện Quiz (Sử dụng các class Bootstrap chuẩn của Người 1)
    quizContainer.innerHTML = `
        <div class="card border-primary">
            <div class="card-header bg-primary text-white d-flex justify-content-between">
                <span>Bộ thẻ: <strong>${quizDeck.title}</strong></span>
                <span>Câu ${currentQuizIndex + 1} / ${quizDeck.cards.length}</span>
            </div>
            <div class="card-body text-center py-5">
                <h3 class="card-title mb-4 display-6">${currentCard.front}</h3>
                
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <input type="text" id="quizAnswer" class="form-control form-control-lg mb-3 text-center" 
                               placeholder="Nhập đáp án (mặt sau) vào đây..." 
                               onkeypress="handleEnterPress(event)">
                        
                        <button class="btn btn-primary btn-lg w-100" onclick="submitQuizAnswer()">
                            Nộp câu trả lời
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Tự động focus con trỏ chuột vào ô nhập liệu để người dùng gõ luôn
    setTimeout(() => {
        document.getElementById("quizAnswer").focus();
    }, 100);
}

// 3. Hàm xử lý nộp câu trả lời
function submitQuizAnswer() {
    const answerInput = document.getElementById("quizAnswer");
    
    // Bắt lỗi: So sánh hoa/thường (Xóa khoảng trắng 2 đầu và chuyển về chữ thường)
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = quizDeck.cards[currentQuizIndex].back.trim().toLowerCase();

    // Bắt lỗi: Để trống đáp án
    if (userAnswer === "") {
        alert("Bạn chưa nhập đáp án kìa!");
        return;
    }

    // Chấm điểm
    if (userAnswer === correctAnswer) {
        score++;
    } else {
        // Có thể alert cho họ biết đáp án đúng (tùy chọn)
        alert(`Sai rồi! Đáp án đúng là: "${quizDeck.cards[currentQuizIndex].back}"`);
    }

    // Chuyển sang câu tiếp theo
    currentQuizIndex++;
    renderQuizQuestion();
}

// Hàm hỗ trợ: Cho phép ấn phím Enter để nộp bài
function handleEnterPress(event) {
    if (event.key === "Enter") {
        submitQuizAnswer();
    }
}

// 4. Hàm hiển thị kết quả cuối cùng
function renderQuizResult() {
    const quizContainer = document.getElementById("quizContainer");
    const resultContainer = document.getElementById("resultContainer");

    // Ẩn vùng làm quiz đi
    quizContainer.innerHTML = "";

    const total = quizDeck.cards.length;
    const wrong = total - score;
    const percent = Math.round((score / total) * 100);

    // Dựa vào điểm để đưa ra lời chúc
    let feedback = "";
    if (percent === 100) feedback = "Tuyệt vời! Bạn đúng tất cả!";
    else if (percent >= 50) feedback = "Khá lắm! Cố gắng phát huy nhé.";
    else feedback = "Bạn cần ôn tập lại bộ thẻ này nhiều hơn!";

    // Vẽ giao diện kết quả (Có làm thêm nút Làm lại Quiz như yêu cầu mở rộng)
    resultContainer.innerHTML = `
        <div class="alert ${percent >= 50 ? 'alert-success' : 'alert-warning'} text-center py-4">
            <h4 class="alert-heading fw-bold mb-3">Kết quả Quiz</h4>
            <h1 class="display-1 fw-bold mb-3">${score}/${total}</h1>
            <p class="fs-5 mb-2">Tỷ lệ chính xác: <strong>${percent}%</strong></p>
            <p class="mb-4">${feedback}</p>
            <hr>
            <button class="btn btn-outline-dark mt-2 px-4" onclick="startQuiz()">🔄 Làm lại Quiz này</button>
        </div>
    `;
}