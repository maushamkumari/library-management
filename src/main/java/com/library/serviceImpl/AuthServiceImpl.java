package com.library.serviceImpl;

import com.library.dto.RegisterRequest;
import com.library.exception.BusinessRuleException;
import com.library.exception.DuplicateRecordException;
import com.library.model.Role;
import com.library.model.Student;
import com.library.model.User;
import com.library.repository.FirestoreRepository;
import com.library.service.AuthService;
import com.library.util.IdGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    private static final Logger log = LoggerFactory.getLogger(AuthServiceImpl.class);
    private final FirestoreRepository repository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(FirestoreRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User registerStudent(RegisterRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new BusinessRuleException("Passwords do not match");
        }
        if (!repository.findByField("users", "email", request.getEmail(), User.class).isEmpty()) {
            throw new DuplicateRecordException("Email is already registered");
        }

        String studentId = IdGenerator.id("STU");
        User user = new User();
        user.setUserId(IdGenerator.id("USR"));
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhoneNumber());
        user.setEnrollmentNo(request.getEnrollmentNumber());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.ROLE_STUDENT);

        Student student = new Student();
        student.setStudentId(studentId);
        student.setFullName(request.getFullName());
        student.setEmail(request.getEmail());
        student.setPhone(request.getPhoneNumber());
        student.setEnrollmentNo(request.getEnrollmentNumber());

        repository.save("users", user.getUserId(), user);
        repository.save("students", studentId, student);
        log.info("Registered student {}", request.getEmail());
        return user;
    }
}
