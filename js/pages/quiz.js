// ==========================================
// CODE XỬ LÝ LOGIC QUIZ VÀ KẾT QUẢ
// ==========================================

let quizDeck = null;
let currentQuizIndex = 0;
let score = 0;

/**
 * 1. Hàm bắt đầu Quiz
 * Lấy dữ liệu từ storage và khởi tạo trạng thái bài làm
 */
function startQuiz() {
    // Lấy ID bộ thẻ đang chọn từ storage (do Người 2 viết)
    // Nếu storage.js chưa có hàm này, bạn cần đảm bảo nó trả về ID đang lưu
    const currentDeckId = typeof getCurrentDeckId === 'function' ? getCurrentDeckId() : null;
    
    if (!currentDeckId) {
        alert("Không tìm thấy bộ thẻ được chọn. Vui lòng quay lại trang chủ!");
        return;
    }

    const decks = typeof getDecks === 'function' ? getDecks() : [];
    quizDeck = decks.find(deck => deck.id === Number(currentDeckId));

    if (!quizDeck || !quizDeck.cards || quizDeck.cards.length === 0) {
        alert("Bộ thẻ này trống hoặc không tồn tại. Hãy thêm thẻ trước!");
        return;
    }

    // Reset trạng thái
    currentQuizIndex = 0;
    score = 0;

    renderQuizQuestion();
}

/**
 * 2. Hàm hiển thị câu hỏi (Giao diện thẻ Quiz)
 */
function renderQuizQuestion() {
    const quizContainer = document.getElementById("quizContainer");
    const resultContainer = document.getElementById("resultContainer");
    
    if (resultContainer) resultContainer.innerHTML = "";

    // Nếu đã hết câu hỏi -> Show kết quả
    if (currentQuizIndex >= quizDeck.cards.length) {
        renderQuizResult();
        return;
    }

    const currentCard = quizDeck.cards[currentQuizIndex];

    quizContainer.innerHTML = `
        <div class="card border-primary shadow">
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
                <span class="fw-bold">Học phần: ${quizDeck.title}</span>
                <span class="badge bg-white text-primary fs-6">${currentQuizIndex + 1} / ${quizDeck.cards.length}</span>
            </div>
            <div class="card-body text-center py-5">
                <p class="text-muted small mb-2 text-uppercase fw-bold">Mặt trước (Câu hỏi)</p>
                <h2 class="card-title mb-5 display-5">${currentCard.front}</h2>
                
                <div class="row justify-content-center">
                    <div class="col-11 col-md-10">
                        <input type="text" id="quizAnswer" 
                               class="form-control form-control-lg mb-3 text-center border-2" 
                               placeholder="Nhập mặt sau của thẻ..." 
                               autocomplete="off"
                               onkeypress="handleEnterPress(event)">
                        
                        <button class="btn btn-primary btn-lg w-100 shadow-sm" onclick="submitQuizAnswer()">
                            Gửi đáp án
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Tự động nhảy con trỏ vào ô nhập
    setTimeout(() => {
        const input = document.getElementById("quizAnswer");
        if(input) input.focus();
    }, 100);
}

/**
 * 3. Xử lý chấm điểm
 */
function submitQuizAnswer() {
    const answerInput = document.getElementById("quizAnswer");
    if (!answerInput) return;

    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = quizDeck.cards[currentQuizIndex].back.trim().toLowerCase();

    if (userAnswer === "") {
        alert("Vui lòng không để trống đáp án!");
        return;
    }

    if (userAnswer === correctAnswer) {
        score++;
        // Tùy chọn: Thêm hiệu ứng âm thanh hoặc màu sắc ở đây
    } else {
        alert(`Chưa chính xác!\n- Bạn nhập: ${userAnswer}\n- Đáp án đúng: ${quizDeck.cards[currentQuizIndex].back}`);
    }

    currentQuizIndex++;
    renderQuizQuestion();
}

/**
 * Hỗ trợ phím tắt
 */
function handleEnterPress(event) {
    if (event.key === "Enter") {
        submitQuizAnswer();
    }
}

/**
 * 4. Hiển thị tổng kết
 */
function renderQuizResult() {
    const quizContainer = document.getElementById("quizContainer");
    const resultContainer = document.getElementById("resultContainer");

    quizContainer.innerHTML = ""; // Xóa khung làm bài

    const total = quizDeck.cards.length;
    const percent = Math.round((score / total) * 100);

    let themeClass = "alert-warning";
    let message = "Cần cố gắng hơn nữa!";

    if (percent === 100) {
        themeClass = "alert-success";
        message = "Xuất sắc! Bạn đã nhớ toàn bộ bộ thẻ.";
    } else if (percent >= 50) {
        themeClass = "alert-info";
        message = "Khá tốt! Một chút nữa là hoàn hảo.";
    }

    resultContainer.innerHTML = `
        <div class="alert ${themeClass} text-center shadow-lg border-0 py-5">
            <h4 class="alert-heading fw-bold mb-4">KẾT QUẢ BÀI QUIZ</h4>
            <div class="mb-4">
                <span class="display-1 fw-bold">${score}</span>
                <span class="fs-2 text-muted"> / ${total}</span>
            </div>
            <p class="fs-4 mb-2">Độ chính xác: <strong>${percent}%</strong></p>
            <p class="mb-4 italic">${message}</p>
            <hr class="my-4">
            <div class="d-grid gap-2 d-md-block">
                <button class="btn btn-dark btn-lg px-4 me-md-2" onclick="startQuiz()">Làm lại</button>
                <a href="home.html" class="btn btn-outline-dark btn-lg px-4">Về trang chủ</a>
            </div>
        </div>
    `;
}