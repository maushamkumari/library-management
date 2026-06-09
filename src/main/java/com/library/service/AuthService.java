package com.library.service;

import com.library.dto.RegisterRequest;
import com.library.model.User;

public interface AuthService {
    User registerStudent(RegisterRequest request);
}
