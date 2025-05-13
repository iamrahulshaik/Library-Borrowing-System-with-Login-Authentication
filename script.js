const books = {
  1: "python",
  2: "data science",
  3: "sql",
  4: "html",
  5: "java",
  6: "c++",
  7: "javascript",
  8: "c#",
  9: "php",
  10: "ruby"
};

const students = {};
let currentBooks = [];

window.onload = () => {
  const select = document.getElementById("book-select");
  for (const [id, name] of Object.entries(books)) {
    const option = document.createElement("option");
    option.value = id;
    option.text = `${name} (${id})`;
    select.appendChild(option);
  }
};

function showMessage(msg, type = "info") {
  const box = document.getElementById("message");
  box.textContent = msg;
  box.className = `message-box ${type}`;
  setTimeout(() => {
    box.textContent = "";
    box.className = "message-box";
  }, 3000);
}

function addBook() {
  const selectedId = document.getElementById("book-select").value;
  const bookName = books[selectedId];

  if (currentBooks.includes(bookName)) {
    showMessage(`⚠️ ${bookName} already selected.`, "warning");
  } else {
    currentBooks.push(bookName);
    showMessage(`✅ ${bookName} added successfully.`, "success");
  }
}

function finalizeStudent() {
  const idInput = document.getElementById("student-id");
  const name = document.getElementById("student-name").value.trim();
  const id = idInput.value.trim();

  // Validate ID is integer only
  if (!/^\d+$/.test(id)) {
    showMessage("⚠️ Student ID must be an integer number.", "warning");
    idInput.focus();
    return;
  }

  if (!name) {
    showMessage("⚠️ Please enter the student's name.", "warning");
    return;
  }

  if (currentBooks.length === 0) {
    showMessage("⚠️ No books selected.", "warning");
    return;
  }

  if (students[id]) {
    currentBooks.forEach(book => {
      if (!students[id].books.includes(book)) {
        students[id].books.push(book);
      }
    });
    showMessage(`🔄 Student ID ${id} found. Updated borrowed books.`, "info");
  } else {
    students[id] = {
      name: name,
      books: [...currentBooks]
    };
    showMessage(`✅ Student ${name} added successfully.`, "success");
  }

  currentBooks = [];
  document.getElementById("student-id").value = "";
  document.getElementById("student-name").value = "";
  document.getElementById("book-select").selectedIndex = 0;
}

function showSummary() {
  const summaryDiv = document.getElementById("summary");
  summaryDiv.innerHTML = "";

  if (Object.keys(students).length === 0) {
    summaryDiv.innerHTML = "<p>No students have borrowed books yet.</p>";
    return;
  }

  for (const [id, data] of Object.entries(students)) {
    const entry = document.createElement("p");
    entry.textContent = `ID ${id} - ${data.name} borrows: ${data.books.join(", ")}`;
    summaryDiv.appendChild(entry);
  }
}

function addNewBook() {
  const newBookInput = document.getElementById("new-book");
  const newBookName = newBookInput.value.trim().toLowerCase();

  if (!newBookName) {
    showMessage("⚠️ Book name cannot be empty.", "warning");
    return;
  }

  const exists = Object.values(books).some(book => book.toLowerCase() === newBookName);
  if (exists) {
    showMessage(`⚠️ "${newBookName}" already exists in the list.`, "warning");
    return;
  }

  const nextId = Math.max(...Object.keys(books).map(Number)) + 1;
  books[nextId] = newBookName;

  const select = document.getElementById("book-select");
  const option = document.createElement("option");
  option.value = nextId;
  option.text = `${newBookName} (${nextId})`;
  select.appendChild(option);

  showMessage(`✅ "${newBookName}" added to book list.`, "success");
  newBookInput.value = "";
}

window.onload = () => {
  const select = document.getElementById("book-select");
  for (const [id, name] of Object.entries(books)) {
    const option = document.createElement("option");
    option.value = id;
    option.text = `${name} (${id})`;
    select.appendChild(option);
  }

  // Enter key navigation setup
  const focusableElements = [
    "student-id",
    "student-name",
    "book-select",
    "new-book"
  ];

  focusableElements.forEach((id, index) => {
    const element = document.getElementById(id);
    element.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const nextElement = document.getElementById(focusableElements[index + 1]);
        if (nextElement) {
          nextElement.focus();
        } else {
          // If no more fields, optionally focus a button (like Add Book)
          document.querySelector("button").focus();
        }
      }
    });
  });
};
