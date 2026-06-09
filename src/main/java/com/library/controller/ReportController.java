package com.library.controller;

import com.library.repository.FirestoreRepository;
import com.library.service.ReportService;
import java.io.IOException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/reports")
public class ReportController {
    private final FirestoreRepository repository;
    private final ReportService reportService;

    public ReportController(FirestoreRepository repository, ReportService reportService) {
        this.repository = repository;
        this.reportService = reportService;
    }

    @GetMapping
    public String reports(Model model) {
        model.addAttribute("books", repository.findAll("books", com.library.model.Book.class));
        model.addAttribute("students", repository.findAll("students", com.library.model.Student.class));
        model.addAttribute("fines", repository.findAll("fines", com.library.model.Fine.class));
        return "reports/index";
    }

    @GetMapping("/books.xlsx")
    public ResponseEntity<byte[]> booksExcel() throws IOException {
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=book-report.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(reportService.booksExcel());
    }

    @GetMapping("/books.pdf")
    public ResponseEntity<byte[]> booksPdf() {
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=book-report.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(reportService.booksPdf());
    }
}
