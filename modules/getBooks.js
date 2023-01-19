const getBookStorage = () => {
  let booksListStorage;
  if (JSON.parse(localStorage.getItem('bookListStorage')) === null) {
    booksListStorage = [];
  } else {
    booksListStorage = JSON.parse(localStorage.getItem('bookListStorage'));
  }
  return booksListStorage;
};

export default getBookStorage;
