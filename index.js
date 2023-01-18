const Form = document.getElementById("form");
const BookInput = document.getElementById("newFormBook");
const AuthorInput = document.getElementById("newFormAuthor");
const ListOfBooks = document.getElementById("bookListItems");

const List = document.getElementById("List");
const AddNew = document.getElementById("AddNew");
const Contact = document.getElementById("Contact");

const listSection = document.getElementById("bookList-section");
const AddNewSection = document.getElementById("AddNewBook");
const ContactSection = document.getElementById("ContactSection");

List.addEventListener("click", () => {
  listSection.style.display = "block";
  List.style.color = "blue";
  AddNew.style.color = "black";
  Contact.style.color = "black";
  AddNewSection.style.display = "none";
  ContactSection.style.display = "none";
});

AddNew.addEventListener("click", () => {
  listSection.style.display = "none";
  AddNewSection.style.display = "block";
  List.style.color = "black";
  AddNew.style.color = "blue";
  Contact.style.color = "black";
  ContactSection.style.display = "none";
});

Contact.addEventListener("click", () => {
  listSection.style.display = "none";
  AddNewSection.style.display = "none";
  ContactSection.style.display = "block";
  List.style.color = "black";
  AddNew.style.color = "black";
  Contact.style.color = "blue";
});

const getBookStorage = () => {
  let booksListStorage;
  if (JSON.parse(localStorage.getItem("bookListStorage")) === null) {
    booksListStorage = [];
  } else {
    booksListStorage = JSON.parse(localStorage.getItem("bookListStorage"));
  }
  return booksListStorage;
};

const NewBook = (myTitle, myAuthor, myId) => {
  const getBooks = getBookStorage();
  getBooks.push({ title: myTitle, author: myAuthor, Id: myId });
  localStorage.setItem("bookListStorage", JSON.stringify(getBooks));
};

const AddNewBook = () => {
  const bookList = getBookStorage();
  NewBook(BookInput.value, AuthorInput.value, bookList.length);
};

Form.addEventListener("submit", () => {
  AddNewBook();
});

const BookAppend = (ele, content, myClass) => {
  const element = document.createElement(ele);
  element.innerHTML = content;
  element.className = myClass;
  return element;
};

const removeBook = (bookIndex) => {
  const books = getBookStorage();
  const newBooks = books.filter((book) => book.Id !== parseInt(bookIndex, 10));
  localStorage.setItem("bookListStorage", JSON.stringify(newBooks));
  ListOfBooks.innerHTML = "";
  displayBooks();
};

const displayBooks = () => {
  const books = getBookStorage();
  books.forEach((book) => {
    const mainContainer = BookAppend("div", "", "pair");
    const titleContainer = BookAppend("div", book.title, "bookClass");
    const authorContainer = BookAppend("div", book.author, "authorClass");
    const divider = BookAppend("div", "by", "authorClass");
    const myButton = BookAppend("button", "Remove", "removeButton");
    myButton.id = book.Id;
    mainContainer.append(titleContainer);
    mainContainer.append(divider);
    mainContainer.append(authorContainer);
    mainContainer.append(myButton);
    ListOfBooks.append(mainContainer);
    myButton.addEventListener("click", (e) => {
      removeBook(e.target.id);
    });
  });
};

displayBooks();