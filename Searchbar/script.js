let books = [];
async function fetchBooks() {
  try {
    const response = await fetch('./product.json');
    books = await response.json();
    renderBooks(books);
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

function renderBooks(bookList) {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';

  bookList.forEach(book => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.year}</td>
      <td>${book.issued}</td>
    `;
    tableBody.appendChild(row);
  });
}

function searchBooks() {
  const searchInput = document.getElementById('search').value.toLowerCase();
  
  const filteredBooks = books.filter(book => book.title.toLowerCase().startsWith(searchInput));
  
  renderBooks(filteredBooks);
}

window.onload = function() {
  fetchBooks([]); 
};
