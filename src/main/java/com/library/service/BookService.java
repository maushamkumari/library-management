package com.library.service;

import com.library.model.Book;
import java.util.List;

public interface BookService {
    Book create(Book book);
    Book update(String id, Book book);
    Book get(String id);
    List<Book> findAll(String query, String category, String author);
    void delete(String id);
}
