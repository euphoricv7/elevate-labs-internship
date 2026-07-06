# Book API — REST API with Node.js & Express

Task 3 submission for the Web Development Internship: a simple REST API to manage a list of books, built with Node.js and Express. Data is stored in memory — no database required.

---

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/books` | Get all books |
| GET | `/books/:id` | Get a single book by ID |
| POST | `/books` | Add a new book |
| PUT | `/books/:id` | Update a book by ID |
| DELETE | `/books/:id` | Delete a book by ID |

---

## Setup & Running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Server runs at `http://localhost:3000`

---

## Book Object

```json
{
  "id": 1,
  "title": "1984",
  "author": "George Orwell"
}
```

---

## Example Requests

**Get all books**
```
GET http://localhost:3000/books
```

**Get a single book**
```
GET http://localhost:3000/books/1
```

**Add a new book**
```
POST http://localhost:3000/books
Content-Type: application/json

{
  "title": "Dune",
  "author": "Frank Herbert"
}
```

**Update a book**
```
PUT http://localhost:3000/books/1
Content-Type: application/json

{
  "title": "Animal Farm"
}
```

**Delete a book**
```
DELETE http://localhost:3000/books/2
```

---

## Testing

Use Postman or curl to test all endpoints. For POST and PUT, set body type to raw → JSON.

```bash
curl http://localhost:3000/books
```

---

## Concepts practiced

REST API design, Express routing, HTTP methods and status codes (200, 201, 400, 404, 500), middleware, JSON handling, and basic error handling.

---

## Project Structure

```
book-api/
├── server.js       # Express server with all routes
├── package.json
├── package-lock.json
└── README.md
```

## Tools used

Node.js, Express.js, VS Code, Postman.
