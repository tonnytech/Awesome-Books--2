/* eslint-disable  no-use-before-define */

import getBookStorage from './modules/getBooks.js';
import BookAppend from './modules/createElement.js';
import { DateTime } from './modules/luxon.js';

const Form = document.getElementById('form');
const BookInput = document.getElementById('newFormBook');
const AuthorInput = document.getElementById('newFormAuthor');
const ListOfBooks = document.getElementById('bookListItems');

const List = document.getElementById('List');
const AddNew = document.getElementById('AddNew');
const Contact = document.getElementById('Contact');

const listSection = document.getElementById('bookList-section');
const AddNewSection = document.getElementById('AddNewBook');
const ContactSection = document.getElementById('ContactSection');

List.addEventListener('click', () => {
  listSection.style.display = 'block';
  List.style.color = 'blue';
  AddNew.style.color = 'black';
  Contact.style.color = 'black';
  AddNewSection.style.display = 'none';
  ContactSection.style.display = 'none';
});

AddNew.addEventListener('click', () => {
  listSection.style.display = 'none';
  AddNewSection.style.display = 'block';
  List.style.color = 'black';
  AddNew.style.color = 'blue';
  Contact.style.color = 'black';
  ContactSection.style.display = 'none';
});

Contact.addEventListener('click', () => {
  listSection.style.display = 'none';
  AddNewSection.style.display = 'none';
  ContactSection.style.display = 'block';
  List.style.color = 'black';
  AddNew.style.color = 'black';
  Contact.style.color = 'blue';
});

const NewBook = (myTitle, myAuthor, myId) => {
  const getBooks = getBookStorage();
  getBooks.push({ title: myTitle, author: myAuthor, Id: myId });
  localStorage.setItem('bookListStorage', JSON.stringify(getBooks));
};

const AddNewBook = () => {
  const bookList = getBookStorage();
  NewBook(BookInput.value, AuthorInput.value, bookList.length);
};

Form.addEventListener('submit', () => {
  AddNewBook();
});

const removeBook = (bookIndex) => {
  const books = getBookStorage();
  const newBooks = books.filter((book) => book.Id !== parseInt(bookIndex, 10));
  localStorage.setItem('bookListStorage', JSON.stringify(newBooks));
  ListOfBooks.innerHTML = '';
  displayBooks();
};

const displayBooks = () => {
  const books = getBookStorage();
  books.forEach((book) => {
    const mainContainer = BookAppend('li', '', 'listContainer');
    const titleContainer = BookAppend('p', book.title, 'bookClass');
    const authorContainer = BookAppend('p', book.author, 'authorClass');
    const divider = BookAppend('p', 'by', 'authorClass');
    const myButton = BookAppend('button', 'Remove', 'removeButton');
    myButton.id = book.Id;
    mainContainer.append(titleContainer);
    mainContainer.append(divider);
    mainContainer.append(authorContainer);
    mainContainer.append(myButton);
    ListOfBooks.append(mainContainer);
    myButton.addEventListener('click', (e) => {
      removeBook(e.target.id);
    });
  });
};

const currentTime = () => {
  const date = document.getElementById('date');

  setInterval(() => {
    const now = DateTime.now();
    date.innerHTML = now.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
  }, 1000);
};

window.addEventListener('load', () => {
  currentTime();
  displayBooks();
  listSection.style.display = 'block';
  List.style.color = 'blue';
  AddNew.style.color = 'black';
  Contact.style.color = 'black';
  AddNewSection.style.display = 'none';
  ContactSection.style.display = 'none';
});