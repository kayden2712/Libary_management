package com.learnjava.librarymanagement.service;

import com.learnjava.librarymanagement.dto.Request.BookCreateRequest;
import com.learnjava.librarymanagement.dto.Request.BookUpdateRequest;
import com.learnjava.librarymanagement.entity.Book;
import com.learnjava.librarymanagement.entity.Category;
import com.learnjava.librarymanagement.repository.BookRepository;
import com.learnjava.librarymanagement.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }

    public List<Book> searchBooks(String keyword) {
        if (keyword == null || keyword.isEmpty()) {
            return bookRepository.findAll();
        }
        return bookRepository.search(keyword); // tìm theo title, author, category
    }

    public List<Book> getBookByQuantity(int quantity) {
        return bookRepository.findByQuantity(quantity);
    }

    public void deleteBook(long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        bookRepository.delete(book);
    }

    public Book updateBook(long id, BookUpdateRequest request) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        if (request.getTitle() != null) book.setTitle(request.getTitle());
        if (request.getAuthor() != null) book.setAuthor(request.getAuthor());
        if (request.getPages() != null) book.setPages(request.getPages());
        if (request.getQuantity() != null) book.setQuantity(request.getQuantity());
        if (request.getCategory() != null) book.setCategory(request.getCategory());
        if (request.getPublishDate() != null) book.setPublishDate(request.getPublishDate());

        return bookRepository.save(book);
    }

    public Book addBook(BookCreateRequest request) {
        Category category = request.getCategory();
        if (category == null) throw new RuntimeException("Category cannot be null");

        Book book = Book.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .pages(request.getPages())
                .quantity(request.getQuantity())
                .category(category)
                .publishDate(request.getPublishDate())
                .build();

        return bookRepository.save(book);
    }
}

