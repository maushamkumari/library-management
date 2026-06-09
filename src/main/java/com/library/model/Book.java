package com.library.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import java.time.LocalDate;

public class Book {
    private String bookId;
    @NotBlank private String title;
    @NotBlank private String author;
    private String publisher;
    @Pattern(regexp = "^(97(8|9))?\\d{9}(\\d|X)$", message = "ISBN must be ISBN-10 or ISBN-13")
    private String isbn;
    @NotBlank private String category;
    @Min(0) private int quantity;
    @Min(0) private int availableQuantity;
    private String description;
    private String shelfLocation;
    private LocalDate addedDate = LocalDate.now();

    public String getBookId() { return bookId; }
    public void setBookId(String bookId) { this.bookId = bookId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    public String getPublisher() { return publisher; }
    public void setPublisher(String publisher) { this.publisher = publisher; }
    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public int getAvailableQuantity() { return availableQuantity; }
    public void setAvailableQuantity(int availableQuantity) { this.availableQuantity = availableQuantity; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getShelfLocation() { return shelfLocation; }
    public void setShelfLocation(String shelfLocation) { this.shelfLocation = shelfLocation; }
    public LocalDate getAddedDate() { return addedDate; }
    public void setAddedDate(LocalDate addedDate) { this.addedDate = addedDate; }
}
