package com.library.service;

import com.library.model.Category;
import java.util.List;

public interface CategoryService {
    Category create(Category category);
    Category update(String id, Category category);
    Category get(String id);
    List<Category> findAll();
    void delete(String id);
}
