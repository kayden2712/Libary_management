package com.learnjava.librarymanagement.controllers;

import com.learnjava.librarymanagement.dto.Request.BookCreateRequest;
import com.learnjava.librarymanagement.dto.Request.BookUpdateRequest;
import com.learnjava.librarymanagement.dto.Response.BookResponse;
import com.learnjava.librarymanagement.entity.Book;
import com.learnjava.librarymanagement.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookService bookService;

    // Lấy tất cả sách hoặc search tổng hợp
    @GetMapping
    public ResponseEntity<List<BookResponse>> getBooks(@RequestParam(required = false) String search) {
        List<Book> books;
        if (search != null && !search.isEmpty()) {
            books = bookService.searchBooks(search);
        } else {
            books = bookService.getAllBooks();
        }
        List<BookResponse> responses = books.stream().map(this::toResponse).collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    // Tìm sách theo số lượng
    @GetMapping("/quantity")
    public ResponseEntity<List<BookResponse>> getBooksByQuantity(@RequestParam int quantity) {
        List<BookResponse> responses = bookService.getBookByQuantity(quantity).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    // Lấy sách theo ID
    @GetMapping("/{id}")
    public ResponseEntity<BookResponse> getBookById(@PathVariable long id) {
        Book book = bookService.getBookById(id);
        return ResponseEntity.ok(toResponse(book));
    }

    // Thêm sách mới
    @PostMapping
    public ResponseEntity<BookResponse> addBook(@RequestBody BookCreateRequest request) {
        Book book = bookService.addBook(request);
        return ResponseEntity.ok(toResponse(book));
    }

    // Cập nhật sách
    @PutMapping("/books/{id}")
    public ResponseEntity<BookResponse> updateBook(@PathVariable long id, @RequestBody BookUpdateRequest request) {
        Book book = bookService.updateBook(id, request);
        return ResponseEntity.ok(toResponse(book));
    }

    // Xóa sách
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    // Helper convert Book -> BookResponse
    private BookResponse toResponse(Book book) {
        return BookResponse.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .category(book.getCategory() != null ? book.getCategory().getCategoryName() : null)
                .categoryId(book.getCategory() != null ? book.getCategory().getCategoryId() : null)
                .pages(book.getPages())
                .quantity(book.getQuantity())
                .publishDate(book.getPublishDate())
                .status(book.getStatus().name())
                .build();
    }
}
