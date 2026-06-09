package com.library.controller;

import com.library.repository.FirestoreRepository;
import com.library.service.DashboardService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashboardController {
    private final DashboardService dashboardService;
    private final FirestoreRepository repository;

    public DashboardController(DashboardService dashboardService, FirestoreRepository repository) {
        this.dashboardService = dashboardService;
        this.repository = repository;
    }

    @GetMapping({"/", "/dashboard"})
    public String dashboard(Model model) {
        model.addAttribute("stats", dashboardService.stats());
        model.addAttribute("activities", repository.findAll("notifications", com.library.model.Notification.class).stream().limit(8).toList());
        return "dashboard/index";
    }

    @GetMapping("/profile")
    public String profile() {
        return "students/profile";
    }
}
