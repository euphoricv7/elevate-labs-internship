// server.js
// Simple REST API to manage a list of books using Node.js and Express.
// Storage is in-memory (no database) as required by the task.

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory "database" — an array of book objects
let books = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'The Hobbit', author: 'J.R.R. Tolkien' },
  { id: 3, title: 'Clean Code', author: 'Robert C. Martin' },
];

// Keeps track of the next id to assign to a new book
let nextId = 4;

// Root route — simple welcome message
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Book API',
    endpoints: {
      getAllBooks: 'GET /books',
      getBookById: 'GET /books/:id',
      createBook: 'POST /books',
      updateBook: 'PUT /books/:id',
      deleteBook: 'DELETE /books/:id',
    },
  });
});

// GET /books -> return all books
app.get('/books', (req, res) => {
  res.status(200).json(books);
});

// GET /books/:id -> return a single book by id
app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ error: `Book with id ${id} not found` });
  }

  res.status(200).json(book);
});

// POST /books -> add a new book from request body
app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Both title and author are required' });
  }

  const newBook = {
    id: nextId++,
    title,
    author,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id -> update a book by id
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ error: `Book with id ${id} not found` });
  }

  const { title, author } = req.body;

  if (!title && !author) {
    return res.status(400).json({ error: 'Provide at least title or author to update' });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.status(200).json(book);
});

// DELETE /books/:id -> remove a book by id
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Book with id ${id} not found` });
  }

  const deletedBook = books.splice(index, 1)[0];
  res.status(200).json({ message: 'Book deleted successfully', book: deletedBook });
});

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Basic error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

app.listen(PORT, () => {
  console.log(`Book API server running at http://localhost:${PORT}`);
});
