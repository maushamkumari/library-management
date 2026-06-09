package com.library.service;

import com.library.model.ReturnBook;
import java.util.List;

public interface ReturnBookService {
    ReturnBook returnBook(String issueId);
    List<ReturnBook> findAll();
}
