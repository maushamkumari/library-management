package com.library.serviceImpl;

import com.library.exception.ResourceNotFoundException;
import com.library.model.Category;
import com.library.repository.FirestoreRepository;
import com.library.service.CategoryService;
import com.library.util.IdGenerator;
import java.util.Comparator;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final FirestoreRepository repository;

    public CategoryServiceImpl(FirestoreRepository repository) {
        this.repository = repository;
    }

    public Category create(Category category) {
        category.setCategoryId(IdGenerator.id("CAT"));
        return repository.save("categories", category.getCategoryId(), category);
    }

    public Category update(String id, Category category) {
        get(id);
        category.setCategoryId(id);
        return repository.save("categories", id, category);
    }

    public Category get(String id) {
        return repository.findById("categories", id, Category.class)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + id));
    }

    public List<Category> findAll() {
        return repository.findAll("categories", Category.class).stream()
                .sorted(Comparator.comparing(Category::getCategoryName, String.CASE_INSENSITIVE_ORDER))
                .toList();
    }

    public void delete(String id) {
        get(id);
        repository.delete("categories", id);
    }
}
