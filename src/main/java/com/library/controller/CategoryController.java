package com.library.controller;

import com.library.model.Category;
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

@Controller
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public String list(Model model) {
        model.addAttribute("categories", categoryService.findAll());
        model.addAttribute("category", new Category());
        return "books/categories";
    }

    @PostMapping
    public String create(@Valid @ModelAttribute Category category, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("categories", categoryService.findAll());
            return "books/categories";
        }
        categoryService.create(category);
        return "redirect:/categories";
    }

    @PostMapping("/{id}")
    public String update(@PathVariable String id, @ModelAttribute Category category) {
        categoryService.update(id, category);
        return "redirect:/categories";
    }

    @PostMapping("/{id}/delete")
    public String delete(@PathVariable String id) {
        categoryService.delete(id);
        return "redirect:/categories";
    }
}
