package com.library.serviceImpl;

import com.library.model.Book;
import com.library.repository.FirestoreRepository;
import com.library.service.ReportService;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

@Service
public class ReportServiceImpl implements ReportService {
    private final FirestoreRepository repository;

    public ReportServiceImpl(FirestoreRepository repository) {
        this.repository = repository;
    }

    @Override
    public byte[] booksExcel() throws IOException {
        try (XSSFWorkbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            var sheet = workbook.createSheet("Books");
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Title");
            header.createCell(1).setCellValue("Author");
            header.createCell(2).setCellValue("ISBN");
            header.createCell(3).setCellValue("Category");
            header.createCell(4).setCellValue("Available");
            int rowIndex = 1;
            for (Book book : repository.findAll("books", Book.class)) {
                Row row = sheet.createRow(rowIndex++);
                row.createCell(0).setCellValue(book.getTitle());
                row.createCell(1).setCellValue(book.getAuthor());
                row.createCell(2).setCellValue(book.getIsbn());
                row.createCell(3).setCellValue(book.getCategory());
                row.createCell(4).setCellValue(book.getAvailableQuantity());
            }
            workbook.write(out);
            return out.toByteArray();
        }
    }

    @Override
    public byte[] booksPdf() {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, out);
            document.open();
            document.add(new Paragraph("Book Report"));
            PdfPTable table = new PdfPTable(4);
            table.addCell("Title");
            table.addCell("Author");
            table.addCell("ISBN");
            table.addCell("Available");
            repository.findAll("books", Book.class).forEach(book -> {
                table.addCell(book.getTitle());
                table.addCell(book.getAuthor());
                table.addCell(book.getIsbn());
                table.addCell(String.valueOf(book.getAvailableQuantity()));
            });
            document.add(table);
            document.close();
            return out.toByteArray();
        } catch (DocumentException ex) {
            throw new IllegalStateException("PDF generation failed", ex);
        }
    }
}
