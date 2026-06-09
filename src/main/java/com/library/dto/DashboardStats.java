package com.library.dto;

public record DashboardStats(
        long totalBooks,
        long totalStudents,
        long availableBooks,
        long issuedBooks,
        long returnedBooks,
        long pendingReturns,
        double fineCollection) {
}
