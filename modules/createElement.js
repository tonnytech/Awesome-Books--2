const BookAppend = (ele, content, myClass) => {
  const element = document.createElement(ele);
  element.innerHTML = content;
  element.className = myClass;
  return element;
};

export default BookAppend;
