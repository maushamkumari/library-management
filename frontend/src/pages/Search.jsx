import { useState } from 'react';
import { libraryApi } from '../api/libraryApi.js';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ books: [], students: [] });

  async function runSearch(event) {
    event.preventDefault();
    if (!query.trim()) return;
    setResults(await libraryApi.search(query));
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Global Search</h2>
        <span>Books, authors, ISBNs, students, and enrollment numbers</span>
      </div>
      <form className="search-form" onSubmit={runSearch}>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search library records" />
        <button type="submit">Search</button>
      </form>
      <div className="result-grid">
        <div>
          <h3>Books</h3>
          {results.books.map((book) => <p key={book.bookId}>{book.title} by {book.author}</p>)}
        </div>
        <div>
          <h3>Students</h3>
          {results.students.map((student) => <p key={student.studentId}>{student.fullName} - {student.enrollmentNo}</p>)}
        </div>
      </div>
    </section>
  );
}
