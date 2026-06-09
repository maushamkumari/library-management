import api from './client';

export const libraryApi = {
  getBooks: () => api.get('/api/books').then((res) => res.data),
  createBook: (book) => api.post('/api/books', book).then((res) => res.data),
  updateBook: (id, book) => api.put(`/api/books/${id}`, book).then((res) => res.data),
  deleteBook: (id) => api.delete(`/api/books/${id}`).then((res) => res.data),
  getStudents: () => api.get('/api/students').then((res) => res.data),
  search: (query) => api.get('/search', { params: { q: query } }).then((res) => res.data)
};
