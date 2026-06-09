package com.library.serviceImpl;

import com.library.config.AppProperties;
import com.library.dto.IssueBookRequest;
import com.library.exception.BusinessRuleException;
import com.library.model.Book;
import com.library.model.IssueBook;
import com.library.model.IssueStatus;
import com.library.model.Student;
import com.library.repository.FirestoreRepository;
import com.library.service.BookService;
import com.library.service.IssueBookService;
import com.library.service.NotificationService;
import com.library.service.StudentService;
import com.library.util.IdGenerator;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class IssueBookServiceImpl implements IssueBookService {
    private static final Logger log = LoggerFactory.getLogger(IssueBookServiceImpl.class);
    private final FirestoreRepository repository;
    private final BookService bookService;
    private final StudentService studentService;
    private final NotificationService notificationService;
    private final AppProperties properties;

    public IssueBookServiceImpl(FirestoreRepository repository, BookService bookService,
                                StudentService studentService, NotificationService notificationService,
                                AppProperties properties) {
        this.repository = repository;
        this.bookService = bookService;
        this.studentService = studentService;
        this.notificationService = notificationService;
        this.properties = properties;
    }

    @Override
    public IssueBook issue(IssueBookRequest request) {
        Book book = bookService.get(request.getBookId());
        Student student = studentService.get(request.getStudentId());
        if (book.getAvailableQuantity() <= 0) {
            throw new BusinessRuleException("Book is not available");
        }
        if (activeByStudent(student.getStudentId()).size() >= properties.getIssue().getMaxBooksPerStudent()) {
            throw new BusinessRuleException("Student has reached the issue limit");
        }

        IssueBook issue = new IssueBook();
        issue.setIssueId(IdGenerator.id("ISSUE"));
        issue.setBookId(book.getBookId());
        issue.setStudentId(student.getStudentId());
        issue.setIssueDate(LocalDate.now());
        issue.setDueDate(request.getDueDate());
        issue.setStatus(IssueStatus.ISSUED);
        repository.save("issuedBooks", issue.getIssueId(), issue);

        book.setAvailableQuantity(book.getAvailableQuantity() - 1);
        bookService.update(book.getBookId(), book);

        notificationService.create(student.getStudentId(), "Book issued", "Book issued successfully. Due date: " + issue.getDueDate());
        log.info("Issued book {} to {}", book.getBookId(), student.getStudentId());
        return issue;
    }

    @Override
    public IssueBook requestIssue(IssueBookRequest request) {
        bookService.get(request.getBookId());
        studentService.get(request.getStudentId());
        IssueBook issue = new IssueBook();
        issue.setIssueId(IdGenerator.id("REQ"));
        issue.setBookId(request.getBookId());
        issue.setStudentId(request.getStudentId());
        issue.setIssueDate(LocalDate.now());
        issue.setDueDate(request.getDueDate());
        issue.setStatus(IssueStatus.REQUESTED);
        return repository.save("issuedBooks", issue.getIssueId(), issue);
    }

    @Override
    public List<IssueBook> findAll() {
        return repository.findAll("issuedBooks", IssueBook.class).stream()
                .sorted(Comparator.comparing(IssueBook::getIssueDate).reversed())
                .toList();
    }

    @Override
    public List<IssueBook> activeByStudent(String studentId) {
        return repository.findByField("issuedBooks", "studentId", studentId, IssueBook.class).stream()
                .filter(issue -> issue.getStatus() == IssueStatus.ISSUED || issue.getStatus() == IssueStatus.OVERDUE)
                .toList();
    }
}
