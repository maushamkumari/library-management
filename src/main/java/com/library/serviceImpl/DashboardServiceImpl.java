package com.library.serviceImpl;

import com.library.dto.DashboardStats;
import com.library.model.Book;
import com.library.model.Fine;
import com.library.model.FineStatus;
import com.library.model.IssueBook;
import com.library.model.IssueStatus;
import com.library.model.ReturnBook;
import com.library.model.Student;
import com.library.repository.FirestoreRepository;
import com.library.service.DashboardService;
import org.springframework.stereotype.Service;

@Service
public class DashboardServiceImpl implements DashboardService {
    private final FirestoreRepository repository;

    public DashboardServiceImpl(FirestoreRepository repository) {
        this.repository = repository;
    }

    @Override
    public DashboardStats stats() {
        var books = repository.findAll("books", Book.class);
        var students = repository.findAll("students", Student.class);
        var issues = repository.findAll("issuedBooks", IssueBook.class);
        var returns = repository.findAll("returnedBooks", ReturnBook.class);
        var fines = repository.findAll("fines", Fine.class);

        long totalCopies = books.stream().mapToLong(Book::getQuantity).sum();
        long available = books.stream().mapToLong(Book::getAvailableQuantity).sum();
        long issued = issues.stream().filter(issue -> issue.getStatus() == IssueStatus.ISSUED).count();
        long pending = issues.stream().filter(issue -> issue.getStatus() == IssueStatus.ISSUED || issue.getStatus() == IssueStatus.OVERDUE).count();
        double paidFine = fines.stream().filter(fine -> fine.getStatus() == FineStatus.PAID).mapToDouble(Fine::getAmount).sum();

        return new DashboardStats(totalCopies, students.size(), available, issued, returns.size(), pending, paidFine);
    }
}
