package com.library.service;

import com.library.model.Student;
import java.util.List;

public interface StudentService {
    Student create(Student student);
    Student update(String id, Student student);
    Student get(String id);
    List<Student> findAll(String query);
    void delete(String id);
}
