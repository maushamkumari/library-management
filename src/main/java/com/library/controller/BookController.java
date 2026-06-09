package com.library.controller;

import com.library.model.Book;
import com.library.service.BookService;
import com.library.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/books")
public class BookController {
    private final BookService bookService;
    private final CategoryService categoryService;

    public BookController(BookService bookService, CategoryService categoryService) {
        this.bookService = bookService;
        this.categoryService = categoryService;
    }

    @GetMapping
    public String list(@RequestParam(required = false) String q, @RequestParam(required = false) String category,
                       @RequestParam(required = false) String author, Model model) {
        model.addAttribute("books", bookService.findAll(q, category, author));
        model.addAttribute("categories", categoryService.findAll());
        return "books/list";
    }

    @GetMapping("/new")
    public String create(Model model) {
        model.addAttribute("book", new Book());
        model.addAttribute("categories", categoryService.findAll());
        return "books/form";
    }

    @PostMapping
    public String create(@Valid @ModelAttribute Book book, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("categories", categoryService.findAll());
            return "books/form";
        }
        bookService.create(book);
        return "redirect:/books";
    }

    @GetMapping("/{id}/edit")
    public String edit(@PathVariable String id, Model model) {
        model.addAttribute("book", bookService.get(id));
        model.addAttribute("categories", categoryService.findAll());
        return "books/form";
    }

    @PostMapping("/{id}")
    public String update(@PathVariable String id, @Valid @ModelAttribute Book book, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("categories", categoryService.findAll());
            return "books/form";
        }
        bookService.update(id, book);
        return "redirect:/books";
    }

    @PostMapping("/{id}/delete")
    public String delete(@PathVariable String id) {
        bookService.delete(id);
        return "redirect:/books";
    }
}
