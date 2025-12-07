package com.learnjava.librarymanagement.service;

import com.learnjava.librarymanagement.dto.Request.BorrowRequest;
import com.learnjava.librarymanagement.entity.User;
import com.learnjava.librarymanagement.entity.Book;
import com.learnjava.librarymanagement.entity.Borrow;
import com.learnjava.librarymanagement.repository.BookRepository;
import com.learnjava.librarymanagement.repository.BorrowRepository;
import com.learnjava.librarymanagement.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BorrowService {

    @Autowired
    private BorrowRepository borrowRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Borrow borrowBook(BorrowRequest request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        Book book = bookRepository.findById(request.getBookId()).orElseThrow(() -> new RuntimeException("Book not found"));

        if (book.getQuantity() <= 0) throw new RuntimeException("Book is out of stock");

        book.setQuantity(book.getQuantity() - 1);
        bookRepository.save(book);

        Borrow borrow = Borrow.builder().user(user).book(book).borrowDate(LocalDate.now()).dueDate(LocalDate.now().plusDays(30)).status(Borrow.BorrowStatus.BORROWED).build();

        return borrowRepository.save(borrow);
    }

    @Transactional
    public Borrow returnBook(Long borrowId) {
        Borrow borrow = borrowRepository.findById(borrowId).orElseThrow(() -> new RuntimeException("Borrow not found"));

        borrow.returnBook();

        Book book = borrow.getBook();
        book.setQuantity(book.getQuantity() + 1);
        bookRepository.save(book);

        return borrowRepository.save(borrow);
    }

    public List<Borrow> getAllBorrows() {
        return (List<Borrow>) borrowRepository.findAll();
    }

    public List<Borrow> getBorrowsByUser(Long userId) {
        return borrowRepository.findByUser_Id(userId);
    }

    public List<Borrow> findByStatus(Borrow.BorrowStatus status) {
        return borrowRepository.findByStatus(status);
    }

    @Transactional
    public void updateOverDueStatus() {
        borrowRepository.markOverdue(LocalDate.now());
    }

    @Transactional
    public void deleteBorrow(Long borrowId) {
        Borrow borrow = borrowRepository.findById(borrowId).orElseThrow(() -> new RuntimeException("Borrow not found"));
        borrowRepository.delete(borrow);
    }


}
