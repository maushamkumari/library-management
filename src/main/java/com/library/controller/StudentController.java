package com.library.controller;

import com.library.model.Student;
import com.library.service.StudentService;
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
@RequestMapping("/students")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public String list(@RequestParam(required = false) String q, Model model) {
        model.addAttribute("students", studentService.findAll(q));
        return "students/list";
    }

    @GetMapping("/new")
    public String create(Model model) {
        model.addAttribute("student", new Student());
        return "students/form";
    }

    @PostMapping
    public String create(@Valid @ModelAttribute Student student, BindingResult result) {
        if (result.hasErrors()) {
            return "students/form";
        }
        studentService.create(student);
        return "redirect:/students";
    }

    @GetMapping("/{id}/edit")
    public String edit(@PathVariable String id, Model model) {
        model.addAttribute("student", studentService.get(id));
        return "students/form";
    }

    @PostMapping("/{id}")
    public String update(@PathVariable String id, @Valid @ModelAttribute Student student, BindingResult result) {
        if (result.hasErrors()) {
            return "students/form";
        }
        studentService.update(id, student);
        return "redirect:/students";
    }

    @PostMapping("/{id}/delete")
    public String delete(@PathVariable String id) {
        studentService.delete(id);
        return "redirect:/students";
    }
}
