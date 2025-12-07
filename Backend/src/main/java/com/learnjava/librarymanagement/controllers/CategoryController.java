package com.learnjava.librarymanagement.controllers;

import com.learnjava.librarymanagement.dto.Request.CategoryRequest;
import com.learnjava.librarymanagement.dto.Response.BookResponse;
import com.learnjava.librarymanagement.dto.Response.CategoryResponse;
import com.learnjava.librarymanagement.entity.Book;
import com.learnjava.librarymanagement.entity.Category;
import com.learnjava.librarymanagement.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // Lấy tất cả category
    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        List<CategoryResponse> responses = categories.stream().map(this::toResponse).collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    // Thêm category
    @PostMapping({ "/categories" })
    public ResponseEntity<CategoryResponse> createCategory(@Valid @RequestBody CategoryRequest request) {
        try {
            Category category = categoryService.createCategory(request);
            return ResponseEntity.ok(toResponse(category));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Cập nhật category
    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponse> updateCategory(@PathVariable long id,
            @RequestBody CategoryRequest request) {
        Category category = categoryService.updateCategory(request);
        return ResponseEntity.ok(toResponse(category));
    }

    // Lấy sách theo tên category
    @GetMapping("/{name}/books")
    public ResponseEntity<List<BookResponse>> getBooksByCategoryName(@PathVariable String name) {
        List<Book> books = categoryService.getBooksByCategoryName(name);
        List<BookResponse> responses = books.stream().map(this::toResponseBook).collect(Collectors.toList());
        if (books.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(responses);
    }

    // Xóa category
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    public CategoryResponse toResponse(Category category) {
        return CategoryResponse.builder()
                .category_name(category.getCategoryName())
                .area(category.getArea())
                .build();

    }

    public BookResponse toResponseBook(Book book) {
        return BookResponse.builder()
                .id(book.getId())
                .title(book.getTitle())
                .build();
    }

}
