package com.library.exception;

import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String notFound(ResourceNotFoundException ex, Model model) {
        model.addAttribute("status", 404);
        model.addAttribute("message", ex.getMessage());
        return "error";
    }

    @ExceptionHandler({DuplicateRecordException.class, BusinessRuleException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String badRequest(RuntimeException ex, Model model) {
        model.addAttribute("status", 400);
        model.addAttribute("message", ex.getMessage());
        return "error";
    }

    @ExceptionHandler(BindException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Map<String, String> validation(BindException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
        return errors;
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String serverError(Exception ex, HttpServletRequest request, Model model) {
        log.error("Unhandled error at {}", request.getRequestURI(), ex);
        model.addAttribute("status", 500);
        model.addAttribute("message", "Unexpected server error. Check logs for details.");
        return "error";
    }
}
