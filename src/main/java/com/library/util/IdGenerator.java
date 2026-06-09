package com.library.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

public final class IdGenerator {
    private static final DateTimeFormatter DATE = DateTimeFormatter.BASIC_ISO_DATE;

    private IdGenerator() {
    }

    public static String id(String prefix) {
        return prefix + "-" + LocalDate.now().format(DATE) + "-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
