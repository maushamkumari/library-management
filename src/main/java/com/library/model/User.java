package com.library.model;

import java.time.LocalDateTime;

public class User {
    private String userId;
    private String fullName;
    private String email;
    private String password;
    private String phone;
    private String enrollmentNo;
    private Role role;
    private boolean enabled = true;
    private LocalDateTime createdAt = LocalDateTime.now();

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEnrollmentNo() { return enrollmentNo; }
    public void setEnrollmentNo(String enrollmentNo) { this.enrollmentNo = enrollmentNo; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    public boolean isEnabled() { return enabled; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
