package com.library.model;

import java.time.LocalDate;

public class Fine {
    private String fineId;
    private String issueId;
    private String studentId;
    private double amount;
    private FineStatus status = FineStatus.UNPAID;
    private LocalDate generatedDate = LocalDate.now();

    public String getFineId() { return fineId; }
    public void setFineId(String fineId) { this.fineId = fineId; }
    public String getIssueId() { return issueId; }
    public void setIssueId(String issueId) { this.issueId = issueId; }
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    public FineStatus getStatus() { return status; }
    public void setStatus(FineStatus status) { this.status = status; }
    public LocalDate getGeneratedDate() { return generatedDate; }
    public void setGeneratedDate(LocalDate generatedDate) { this.generatedDate = generatedDate; }
}
