package com.library.serviceImpl;

import com.library.exception.DuplicateRecordException;
import com.library.exception.ResourceNotFoundException;
import com.library.model.Student;
import com.library.repository.FirestoreRepository;
import com.library.service.StudentService;
import com.library.util.IdGenerator;
import java.util.Comparator;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class StudentServiceImpl implements StudentService {
    private final FirestoreRepository repository;

    public StudentServiceImpl(FirestoreRepository repository) {
        this.repository = repository;
    }

    public Student create(Student student) {
        if (!repository.findByField("students", "email", student.getEmail(), Student.class).isEmpty()) {
            throw new DuplicateRecordException("Student email already exists");
        }
        student.setStudentId(IdGenerator.id("STU"));
        return repository.save("students", student.getStudentId(), student);
    }

    public Student update(String id, Student student) {
        get(id);
        student.setStudentId(id);
        return repository.save("students", id, student);
    }

    public Student get(String id) {
        return repository.findById("students", id, Student.class)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found: " + id));
    }

    public List<Student> findAll(String query) {
        String q = query == null ? "" : query.trim().toLowerCase();
        return repository.findAll("students", Student.class).stream()
                .filter(student -> !StringUtils.hasText(q)
                        || safe(student.getFullName()).contains(q)
                        || safe(student.getEmail()).contains(q)
                        || safe(student.getEnrollmentNo()).contains(q))
                .sorted(Comparator.comparing(Student::getFullName, String.CASE_INSENSITIVE_ORDER))
                .toList();
    }

    public void delete(String id) {
        get(id);
        repository.delete("students", id);
    }

    private String safe(String value) {
        return value == null ? "" : value.toLowerCase();
    }
}
