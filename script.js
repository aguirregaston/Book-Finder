const searchButton = document.getElementById('searchButton')
const searchInput = document.getElementById('searchInput')
const results = document.getElementById('results')

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim()
  if (query) {
    searchBooks(query)
  } else {
    alert('Please enter a search term!')
  }
})

async function searchBooks(query) {
  results.innerHTML = '<p>Loading...</p>'
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`)
    const data = await response.json()

    if (data.items) {
      displayBooks(data.items)
    } else {
      results.innerHTML = '<p>No books found.</p>'
    }
  } catch (error) {
    results.innerHTML = '<p>Error fetching books. Please try again later.</p>'
    console.error(error)
  }
}

function displayBooks(books) {
  results.innerHTML = ''
  books.forEach(book => {
    const { title, authors, imageLinks } = book.volumeInfo

    const bookElement = document.createElement('div')
    bookElement.className = 'book'

    const bookImage = imageLinks?.thumbnail || 'https://via.placeholder.com/150'

    bookElement.innerHTML = `
      <img src="${bookImage}" alt="$title">
      <h3>${title}</h3>
      <p>${authors ? authors.join(', ') : 'Unknown Author'}</p>
    `

    results.appendChild(bookElement)
  })
}