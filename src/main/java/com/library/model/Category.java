package com.library.model;

import jakarta.validation.constraints.NotBlank;

public class Category {
    private String categoryId;
    @NotBlank private String categoryName;
    private String description;

    public String getCategoryId() { return categoryId; }
    public void setCategoryId(String categoryId) { this.categoryId = categoryId; }
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
