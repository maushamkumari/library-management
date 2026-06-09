package com.library.service;

import com.library.dto.IssueBookRequest;
import com.library.model.IssueBook;
import java.util.List;

public interface IssueBookService {
    IssueBook issue(IssueBookRequest request);
    IssueBook requestIssue(IssueBookRequest request);
    List<IssueBook> findAll();
    List<IssueBook> activeByStudent(String studentId);
}
