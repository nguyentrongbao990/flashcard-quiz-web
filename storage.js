const STORAGE_KEY = "flashcardDecks";

function getDecks() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveDecks(decks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
}

function initSampleData() {
  const decks = getDecks();

  if (decks.length === 0) {
    const sampleDecks = [
      {
        id: 1,
        title: "English Basic",
        description: "Từ vựng tiếng Anh cơ bản",
        cards: [
          { id: 1, front: "apple", back: "quả táo" },
          { id: 2, front: "book", back: "quyển sách" },
          { id: 3, front: "school", back: "trường học" }
        ]
      },
      {
        id: 2,
        title: "OOP Basic",
        description: "Khái niệm lập trình hướng đối tượng",
        cards: [
          { id: 1, front: "class", back: "khuôn mẫu tạo đối tượng" },
          { id: 2, front: "object", back: "đối tượng" },
          { id: 3, front: "inheritance", back: "kế thừa" }
        ]
      }
    ];

    saveDecks(sampleDecks);
  }
}