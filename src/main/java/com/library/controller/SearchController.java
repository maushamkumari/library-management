package com.library.controller;

import com.library.model.Book;
import com.library.model.Student;
import com.library.service.BookService;
import com.library.service.StudentService;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SearchController {
    private final BookService bookService;
    private final StudentService studentService;

    public SearchController(BookService bookService, StudentService studentService) {
        this.bookService = bookService;
        this.studentService = studentService;
    }

    @GetMapping("/search")
    public Map<String, List<?>> search(@RequestParam String q) {
        List<Book> books = bookService.findAll(q, null, null).stream().limit(10).toList();
        List<Student> students = studentService.findAll(q).stream().limit(10).toList();
        return Map.of("books", books, "students", students);
    }
}
