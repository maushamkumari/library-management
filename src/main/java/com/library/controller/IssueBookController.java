package com.library.controller;

import com.library.dto.IssueBookRequest;
import com.library.service.BookService;
import com.library.service.IssueBookService;
import com.library.service.StudentService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/issues")
public class IssueBookController {
    private final IssueBookService issueBookService;
    private final BookService bookService;
    private final StudentService studentService;

    public IssueBookController(IssueBookService issueBookService, BookService bookService, StudentService studentService) {
        this.issueBookService = issueBookService;
        this.bookService = bookService;
        this.studentService = studentService;
    }

    @GetMapping
    public String list(Model model) {
        model.addAttribute("issues", issueBookService.findAll());
        IssueBookRequest request = new IssueBookRequest();
        request.setDueDate(LocalDate.now().plusDays(14));
        model.addAttribute("issueBookRequest", request);
        model.addAttribute("books", bookService.findAll(null, null, null));
        model.addAttribute("students", studentService.findAll(null));
        return "books/issues";
    }

    @PostMapping
    public String issue(@Valid @ModelAttribute IssueBookRequest issueBookRequest, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("issues", issueBookService.findAll());
            model.addAttribute("books", bookService.findAll(null, null, null));
            model.addAttribute("students", studentService.findAll(null));
            return "books/issues";
        }
        issueBookService.issue(issueBookRequest);
        return "redirect:/issues";
    }
}
