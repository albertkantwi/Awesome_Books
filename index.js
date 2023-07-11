let bookCollection = JSON.parse(localStorage.getItem('bookCollection')) || [];

function displayBooks() {
  const bookListDiv = document.querySelector('.books-list');
  bookListDiv.innerHTML = '';

  function removeBook(index) {
    bookCollection = bookCollection.filter((_, i) => i !== index);

    localStorage.setItem('bookCollection', JSON.stringify(bookCollection));

    displayBooks();
  }

  bookCollection.forEach((book, index) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book-details');
    bookDiv.innerHTML = `

      <strong>${book.title}</strong> By: ${book.author}
    
    `;

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => removeBook(index));

    const hr = document.createElement('hr');

    bookDiv.appendChild(removeBtn);
    bookDiv.appendChild(hr);
    bookListDiv.appendChild(bookDiv);
  });
}

function addBook(event) {
  event.preventDefault();

  const titleInput = document.querySelector('.title');
  const authorInput = document.querySelector('.author');

  const title = titleInput.value;
  const author = authorInput.value;

  if (title && author) {
    const newBook = {
      title,
      author,
    };

    bookCollection.push(newBook);

    localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
    titleInput.value = '';
    authorInput.value = '';

    displayBooks();
  }
}

const addBookForm = document.querySelector('.addForm');
addBookForm.addEventListener('submit', addBook);

displayBooks();
