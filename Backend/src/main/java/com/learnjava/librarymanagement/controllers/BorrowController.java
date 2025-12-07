package com.learnjava.librarymanagement.controllers;

import com.learnjava.librarymanagement.dto.Request.BorrowRequest;
import com.learnjava.librarymanagement.dto.Response.BorrowResponse;
import com.learnjava.librarymanagement.entity.Borrow;
import com.learnjava.librarymanagement.service.BorrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/borrows")
public class BorrowController {

    @Autowired
    private BorrowService borrowService;

    // Lấy tất cả bản ghi mượn
    @GetMapping
    public ResponseEntity<List<BorrowResponse>> getAllBorrows() {
        List<Borrow> borrows = borrowService.getAllBorrows();
        List<BorrowResponse> responses = borrows.stream().map(this::toResponse).collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    // Lấy tất cả phiếu mượn mà 1 người dùng đang mượn
    @GetMapping("/user")
    public ResponseEntity<BorrowResponse> getBorrowsByUser(@RequestParam long userId) {
        Borrow borrow = borrowService.getBorrowsByUser(userId).get(0);
        return ResponseEntity.ok(toResponse(borrow));
    }

    // Lấy tất cả sách theo trạng thái
    @GetMapping("/status")
    public ResponseEntity<List<BorrowResponse>> getBorrowsByStatus(@RequestParam Borrow.BorrowStatus status) {
        List<Borrow> borrows = borrowService.findByStatus(status);
        List<BorrowResponse> responses = borrows.stream().map(this::toResponse).collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    // Mượn sách
    @PostMapping("/borrow")
    public ResponseEntity<BorrowResponse> borrowBook(@RequestBody BorrowRequest borrowRequest) {
        try {
            Borrow borrow = borrowService.borrowBook(borrowRequest);
            return ResponseEntity.ok(toResponse(borrow));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping({"/{id}"})
    public ResponseEntity<Void> deleteBorrow(@PathVariable long id) {
        borrowService.deleteBorrow(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/return")
    void returnBook(@PathVariable long id) {
        borrowService.returnBook(id);
    }

    public BorrowResponse toResponse(Borrow borrow) {
        return BorrowResponse.builder()
                .id(borrow.getBorrowId())
                .title(borrow.getBook().getTitle())
                .borrowDate(borrow.getBorrowDate())
                .dueDate(borrow.getDueDate())
                .status(borrow.getStatus().name())
                .userId(borrow.getUser().getId())
                .build();
    }
}
