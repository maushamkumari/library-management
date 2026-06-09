package com.library.security;

import com.library.model.User;
import com.library.repository.FirestoreRepository;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class LibraryUserDetailsService implements UserDetailsService {
    private static final Logger log = LoggerFactory.getLogger(LibraryUserDetailsService.class);
    private final FirestoreRepository repository;

    public LibraryUserDetailsService(FirestoreRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = repository.findByField("users", "email", email, User.class).stream()
                .findFirst()
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        log.info("Login lookup for {}", email);
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                user.isEnabled(),
                true,
                true,
                true,
                List.of(new SimpleGrantedAuthority(user.getRole().name())));
    }
}
