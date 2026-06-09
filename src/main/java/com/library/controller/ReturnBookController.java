package com.library.controller;

import com.library.service.IssueBookService;
import com.library.service.ReturnBookService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/returns")
public class ReturnBookController {
    private final ReturnBookService returnBookService;
    private final IssueBookService issueBookService;

    public ReturnBookController(ReturnBookService returnBookService, IssueBookService issueBookService) {
        this.returnBookService = returnBookService;
        this.issueBookService = issueBookService;
    }

    @GetMapping
    public String list(Model model) {
        model.addAttribute("returns", returnBookService.findAll());
        model.addAttribute("issues", issueBookService.findAll());
        return "books/returns";
    }

    @PostMapping
    public String returnBook(@RequestParam String issueId) {
        returnBookService.returnBook(issueId);
        return "redirect:/returns";
    }
}
