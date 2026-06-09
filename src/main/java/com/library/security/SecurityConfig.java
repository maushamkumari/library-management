package com.library.security;

import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                   AuthenticationSuccessHandler successHandler,
                                                   @Value("${library.security.session-timeout-minutes:30}") int timeout) throws Exception {
        http
                .cors(cors -> {})
                .csrf(csrf -> csrf.ignoringRequestMatchers("/api/**", "/search"))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/css/**", "/js/**", "/images/**", "/webjars/**", "/register", "/login").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/**", "/search").permitAll()
                        .requestMatchers("/api/**").hasRole("ADMIN")
                        .requestMatchers("/books/**", "/categories/**", "/students/**", "/issues/**", "/returns/**", "/reports/**").hasRole("ADMIN")
                        .requestMatchers("/dashboard", "/profile", "/search/**").hasAnyRole("ADMIN", "STUDENT")
                        .anyRequest().authenticated())
                .formLogin(form -> form
                        .loginPage("/login")
                        .usernameParameter("email")
                        .passwordParameter("password")
                        .successHandler(successHandler)
                        .permitAll())
                .logout(logout -> logout.logoutSuccessUrl("/login?logout").permitAll())
                .sessionManagement(session -> session.invalidSessionUrl("/login?expired"));
        return http.build();
    }

    @Bean
    public AuthenticationSuccessHandler successHandler() {
        return (request, response, authentication) -> {
            boolean admin = authentication.getAuthorities().stream()
                    .anyMatch(authority -> "ROLE_ADMIN".equals(authority.getAuthority()));
            response.sendRedirect(admin ? "/dashboard" : "/profile");
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://127.0.0.1:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
