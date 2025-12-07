package com.learnjava.librarymanagement.dto.Request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
public class BorrowRequest {
    @NotEmpty(message = "Book Id can't be null")
    private Long bookId;

    @NotEmpty(message = "User Id can't be null")
    private Long userId;

    @NotEmpty(message = "Due date can't be null")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate borrowDate;
}
