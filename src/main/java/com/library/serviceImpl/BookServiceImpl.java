package com.library.serviceImpl;

import com.library.exception.ResourceNotFoundException;
import com.library.model.Book;
import com.library.repository.FirestoreRepository;
import com.library.service.BookService;
import com.library.util.IdGenerator;
import java.util.Comparator;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class BookServiceImpl implements BookService {
    private static final Logger log = LoggerFactory.getLogger(BookServiceImpl.class);
    private final FirestoreRepository repository;

    public BookServiceImpl(FirestoreRepository repository) {
        this.repository = repository;
    }

    @Override
    public Book create(Book book) {
        book.setBookId(IdGenerator.id("BOOK"));
        if (book.getAvailableQuantity() == 0) {
            book.setAvailableQuantity(book.getQuantity());
        }
        repository.save("books", book.getBookId(), book);
        log.info("Created book {}", book.getTitle());
        return book;
    }

    @Override
    public Book update(String id, Book book) {
        Book existing = get(id);
        book.setBookId(existing.getBookId());
        repository.save("books", id, book);
        log.info("Updated book {}", id);
        return book;
    }

    @Override
    public Book get(String id) {
        return repository.findById("books", id, Book.class)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found: " + id));
    }

    @Override
    public List<Book> findAll(String query, String category, String author) {
        String q = query == null ? "" : query.trim().toLowerCase();
        return repository.findAll("books", Book.class).stream()
                .filter(book -> !StringUtils.hasText(q)
                        || safe(book.getTitle()).contains(q)
                        || safe(book.getAuthor()).contains(q)
                        || safe(book.getIsbn()).contains(q)
                        || safe(book.getCategory()).contains(q))
                .filter(book -> !StringUtils.hasText(category) || category.equalsIgnoreCase(book.getCategory()))
                .filter(book -> !StringUtils.hasText(author) || author.equalsIgnoreCase(book.getAuthor()))
                .sorted(Comparator.comparing(Book::getTitle, String.CASE_INSENSITIVE_ORDER))
                .toList();
    }

    @Override
    public void delete(String id) {
        get(id);
        repository.delete("books", id);
        log.info("Deleted book {}", id);
    }

    private String safe(String value) {
        return value == null ? "" : value.toLowerCase();
    }
}
