package com.library.serviceImpl;

import com.library.config.AppProperties;
import com.library.exception.BusinessRuleException;
import com.library.exception.ResourceNotFoundException;
import com.library.model.Book;
import com.library.model.Fine;
import com.library.model.IssueBook;
import com.library.model.IssueStatus;
import com.library.model.ReturnBook;
import com.library.repository.FirestoreRepository;
import com.library.service.BookService;
import com.library.service.NotificationService;
import com.library.service.ReturnBookService;
import com.library.util.IdGenerator;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ReturnBookServiceImpl implements ReturnBookService {
    private static final Logger log = LoggerFactory.getLogger(ReturnBookServiceImpl.class);
    private final FirestoreRepository repository;
    private final BookService bookService;
    private final NotificationService notificationService;
    private final AppProperties properties;

    public ReturnBookServiceImpl(FirestoreRepository repository, BookService bookService,
                                 NotificationService notificationService, AppProperties properties) {
        this.repository = repository;
        this.bookService = bookService;
        this.notificationService = notificationService;
        this.properties = properties;
    }

    @Override
    public ReturnBook returnBook(String issueId) {
        IssueBook issue = repository.findById("issuedBooks", issueId, IssueBook.class)
                .orElseThrow(() -> new ResourceNotFoundException("Issue record not found: " + issueId));
        if (issue.getStatus() == IssueStatus.RETURNED) {
            throw new BusinessRuleException("Book already returned");
        }

        double fineAmount = calculateFine(issue.getDueDate(), LocalDate.now());
        ReturnBook returned = new ReturnBook();
        returned.setReturnId(IdGenerator.id("RET"));
        returned.setIssueId(issueId);
        returned.setReturnDate(LocalDate.now());
        returned.setFine(fineAmount);
        repository.save("returnedBooks", returned.getReturnId(), returned);

        issue.setStatus(IssueStatus.RETURNED);
        repository.save("issuedBooks", issue.getIssueId(), issue);

        Book book = bookService.get(issue.getBookId());
        book.setAvailableQuantity(Math.min(book.getQuantity(), book.getAvailableQuantity() + 1));
        bookService.update(book.getBookId(), book);

        if (fineAmount > 0) {
            Fine fine = new Fine();
            fine.setFineId(IdGenerator.id("FINE"));
            fine.setIssueId(issueId);
            fine.setStudentId(issue.getStudentId());
            fine.setAmount(fineAmount);
            repository.save("fines", fine.getFineId(), fine);
        }
        notificationService.create(issue.getStudentId(), "Book returned", "Return recorded. Fine: Rs. " + fineAmount);
        log.info("Returned issue {} with fine {}", issueId, fineAmount);
        return returned;
    }

    @Override
    public List<ReturnBook> findAll() {
        return repository.findAll("returnedBooks", ReturnBook.class).stream()
                .sorted(Comparator.comparing(ReturnBook::getReturnDate).reversed())
                .toList();
    }

    private double calculateFine(LocalDate dueDate, LocalDate returnDate) {
        long lateDays = ChronoUnit.DAYS.between(dueDate, returnDate) - properties.getFine().getFreeDays();
        return Math.max(0, lateDays) * properties.getFine().getAmountPerDay();
    }
}
