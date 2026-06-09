package com.library.service;

import java.io.IOException;

public interface ReportService {
    byte[] booksExcel() throws IOException;
    byte[] booksPdf();
}
