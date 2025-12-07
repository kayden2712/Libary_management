package com.learnjava.librarymanagement.dto.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
public class BookResponse {
    private Long id;
    private String title;
    private String author;
    private String category;
    private Long categoryId;
    private Integer pages;
    private Integer quantity;
    private LocalDate publishDate;
    private String status;

}
