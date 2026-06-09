package com.library.model;

import java.time.LocalDate;

public class ReturnBook {
    private String returnId;
    private String issueId;
    private LocalDate returnDate;
    private double fine;

    public String getReturnId() { return returnId; }
    public void setReturnId(String returnId) { this.returnId = returnId; }
    public String getIssueId() { return issueId; }
    public void setIssueId(String issueId) { this.issueId = issueId; }
    public LocalDate getReturnDate() { return returnDate; }
    public void setReturnDate(LocalDate returnDate) { this.returnDate = returnDate; }
    public double getFine() { return fine; }
    public void setFine(double fine) { this.fine = fine; }
}
