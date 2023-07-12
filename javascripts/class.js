class BookCollection {
    constructor() {
      this.books = JSON.parse(localStorage.getItem('bookCollection')) || [];
    }
  
    displayBooks() {
      const bookListDiv = document.querySelector('.books-list');
      bookListDiv.innerHTML = '';
  
      this.books.forEach((book, index) => {
        const booksContainerDiv = document.createElement('div');
        booksContainerDiv.classList.add('books-container');
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book-details');
        bookDiv.innerHTML = `
        <strong>"${book.title}"</strong> by: ${book.author}
        `;
        
        const removeDiv = document.createElement('div');
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-btn');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => this.removeBook(index));
        
        removeDiv.appendChild(removeBtn);        
        
        booksContainerDiv.appendChild(bookDiv);
        booksContainerDiv.appendChild(removeDiv);
        
        bookListDiv.appendChild(booksContainerDiv);
      });
    }
  
    addBook(event) {
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
  
        this.books.push(newBook);
  
        localStorage.setItem('bookCollection', JSON.stringify(this.books));
  
        titleInput.value = '';
        authorInput.value = '';
  
        this.displayBooks();
      }
    }
  
    removeBook(index) {
      this.books.splice(index, 1);
  
      localStorage.setItem('bookCollection', JSON.stringify(this.books));
  
      this.displayBooks();
    }
  }
  
  const bookCollection = new BookCollection();
  
  const addBookForm = document.querySelector('.addForm');
  addBookForm.addEventListener('submit', (event) => bookCollection.addBook(event));
  
  bookCollection.displayBooks();