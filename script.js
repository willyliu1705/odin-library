let myLibrary = [];

function Book(name, author, id) {
  this.name = name;
  this.author = author;
  this.id = id;
  this.readStatus = false;
}

function createBook(name, author) {
  const id = crypto.randomUUID();
  const b = new Book(name, author, id);
  myLibrary.push(b);
  return b;
}

Book.prototype.changeReadStatus = function () {
  this.readStatus = this.readStatus ? false : true;
}

createBook("Atomic Habits", "James Clear");
createBook("The Psychology of Money", "Morgan Housel");
createBook("Meditations", "Marcus Aurelius");

let root = document.querySelector("ul");
function displayBooks(bookArray) {
  for (const book of myLibrary) {
    displayNewBook(book);
  }
}

displayBooks(myLibrary);

const form = document.querySelector("form");

function displayNewBook(book) {
  const bookDiv = document.createElement("li");
  let bookDetails = "";
  for (const key in book) {
    if (key == "id") {
      bookDiv.classList.add(`data-${book[key]}`)
    }

    if (key == "author") {
      bookDetails += book[key] + " ";
    }

    if (key == "name") {
      bookDetails += " " + book[key] + ", "
    }
  }
  bookDiv.textContent = bookDetails;
  root.appendChild(bookDiv);

  const readStatusButton = document.createElement("button");
  readStatusButton.textContent = "read status";
  readStatusButton.style.backgroundColor = "orange";
  readStatusButton.addEventListener("click", (event) => {
    if (readStatusButton.style.backgroundColor === "orange") {
      readStatusButton.style.backgroundColor = "green";
    } else {
      readStatusButton.style.backgroundColor = "orange";
    }
    book.changeReadStatus();
  });
  bookDiv.prepend(readStatusButton);

  const removeButton = document.createElement("button");
  removeButton.textContent = "remove";
  removeButton.addEventListener("click", (event) => {
    myLibrary = myLibrary.filter((singleBook) => singleBook.id !== book.id);
    bookDiv.remove();
  });
  bookDiv.appendChild(removeButton);
}

form.addEventListener("submit", addBook);

function addBook(event) {
  const form = event.target;
  bookName = form.elements.title.value;
  bookAuthor = form.elements.author.value;
  const b = createBook(bookName, bookAuthor);
  displayNewBook(b);

  event.preventDefault();
}