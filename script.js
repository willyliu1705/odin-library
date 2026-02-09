const myLibrary = [];

function Book(name, author, id) {
  this.name = name;
  this.author = author;
  this.id = id;
}

function createBook(name, author) {
  const id = crypto.randomUUID();
  const b = new Book(name, author, id);
  myLibrary.push(b);
  return b;
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
    if (key == "id") continue;
    if (key == "author") {
      bookDetails += book[key]
    } else {
      bookDetails += book[key] + ", "
    }
  }
  bookDiv.textContent = bookDetails;
  root.appendChild(bookDiv);
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