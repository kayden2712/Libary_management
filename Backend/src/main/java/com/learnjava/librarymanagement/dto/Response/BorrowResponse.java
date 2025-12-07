package com.learnjava.librarymanagement.dto.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
public class BorrowResponse {
    private Long id;
    private Long bookId;
    private String title;
    private Long userId;
    private String username;
    private LocalDate borrowDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private String status;
}
