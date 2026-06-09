# API Documentation

All API routes require authentication.

## Books

`GET /api/books`

Returns all books.

`POST /api/books`

Creates a book.

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "publisher": "Prentice Hall",
  "isbn": "9780132350884",
  "category": "Programming",
  "quantity": 5,
  "availableQuantity": 5,
  "shelfLocation": "A-12"
}
```

`PUT /api/books/{id}`

Updates a book.

`DELETE /api/books/{id}`

Deletes a book.

## Students

`GET /api/students`

Returns all students.

## Search

`GET /search?q={term}`

Returns book and student suggestions.
