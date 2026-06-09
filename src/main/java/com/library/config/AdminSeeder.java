package com.library.config;

import com.library.model.Role;
import com.library.model.User;
import com.library.repository.FirestoreRepository;
import com.library.util.IdGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class AdminSeeder implements CommandLineRunner {
    private static final Logger log = LoggerFactory.getLogger(AdminSeeder.class);
    private final FirestoreRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final String email;
    private final String password;

    public AdminSeeder(FirestoreRepository repository, PasswordEncoder passwordEncoder,
                       @Value("${ADMIN_EMAIL:}") String email,
                       @Value("${ADMIN_PASSWORD:}") String password) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.email = email;
        this.password = password;
    }

    @Override
    public void run(String... args) {
        if (!StringUtils.hasText(email) || !StringUtils.hasText(password)
                || !repository.findByField("users", "email", email, User.class).isEmpty()) {
            return;
        }
        User admin = new User();
        admin.setUserId(IdGenerator.id("ADM"));
        admin.setFullName("Library Administrator");
        admin.setEmail(email);
        admin.setPassword(passwordEncoder.encode(password));
        admin.setRole(Role.ROLE_ADMIN);
        repository.save("users", admin.getUserId(), admin);
        log.info("Seeded administrator account {}", email);
    }
}
