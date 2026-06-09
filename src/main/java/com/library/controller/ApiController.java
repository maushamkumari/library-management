package com.library.controller;

import com.library.model.Book;
import com.library.model.Student;
import com.library.service.BookService;
import com.library.service.StudentService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiController {
    private final BookService bookService;
    private final StudentService studentService;

    public ApiController(BookService bookService, StudentService studentService) {
        this.bookService = bookService;
        this.studentService = studentService;
    }

    @GetMapping("/books")
    public List<Book> books() {
        return bookService.findAll(null, null, null);
    }

    @PostMapping("/books")
    public Book createBook(@Valid @RequestBody Book book) {
        return bookService.create(book);
    }

    @PutMapping("/books/{id}")
    public Book updateBook(@PathVariable String id, @Valid @RequestBody Book book) {
        return bookService.update(id, book);
    }

    @DeleteMapping("/books/{id}")
    public void deleteBook(@PathVariable String id) {
        bookService.delete(id);
    }

    @GetMapping("/students")
    public List<Student> students() {
        return studentService.findAll(null);
    }
}
