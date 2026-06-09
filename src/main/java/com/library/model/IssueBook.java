package com.library.model;

import java.time.LocalDate;

public class IssueBook {
    private String issueId;
    private String bookId;
    private String studentId;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private IssueStatus status = IssueStatus.ISSUED;

    public String getIssueId() { return issueId; }
    public void setIssueId(String issueId) { this.issueId = issueId; }
    public String getBookId() { return bookId; }
    public void setBookId(String bookId) { this.bookId = bookId; }
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public LocalDate getIssueDate() { return issueDate; }
    public void setIssueDate(LocalDate issueDate) { this.issueDate = issueDate; }
    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public IssueStatus getStatus() { return status; }
    public void setStatus(IssueStatus status) { this.status = status; }
}
