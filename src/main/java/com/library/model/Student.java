package com.library.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class Student {
    private String studentId;
    @NotBlank private String fullName;
    @Email @NotBlank private String email;
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone must contain 10 digits")
    private String phone;
    @NotBlank private String enrollmentNo;
    private String department;
    private String semester;

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEnrollmentNo() { return enrollmentNo; }
    public void setEnrollmentNo(String enrollmentNo) { this.enrollmentNo = enrollmentNo; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }
}
