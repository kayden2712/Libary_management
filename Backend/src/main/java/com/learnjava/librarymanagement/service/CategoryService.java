package com.learnjava.librarymanagement.service;

import com.learnjava.librarymanagement.dto.Request.CategoryRequest;
import com.learnjava.librarymanagement.entity.Book;
import com.learnjava.librarymanagement.entity.Category;
import com.learnjava.librarymanagement.repository.BookRepository;
import com.learnjava.librarymanagement.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BookRepository bookRepository;

    // Lấy category theo id
    public Category getCategoryById(long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    // Lấy tất cả category
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Lấy category theo tên
    public Category getCategoryByName(String categoryName) {
        return categoryRepository.findByCategoryName(categoryName)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    // Lấy sách theo tên category
    public List<Book> getBooksByCategoryName(String categoryName) {
        Category category = getCategoryByName(categoryName);
        return bookRepository.findByCategory(category);
    }

    // Thêm category
    public Category createCategory(CategoryRequest request) {
        return categoryRepository.save(Category.builder()
                .categoryName(request.getCategory_name())
                .area(request.getArea())
                .build());
    }

    // Cập nhật category
    @Transactional
    public Category updateCategory(CategoryRequest request) {
        Category category = categoryRepository.findById(request.getCategory_id()).orElseThrow(() -> new RuntimeException("Category not found"));

        if (request.getCategory_name() != null) category.setCategoryName(request.getCategory_name());
        if (request.getArea() != null) category.setArea(request.getArea());

        return categoryRepository.save(category);
    }

    // Xóa category
    @Transactional
    public void deleteCategory(long id) {
        Category existingCategory = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
        categoryRepository.delete(existingCategory);
    }
}
