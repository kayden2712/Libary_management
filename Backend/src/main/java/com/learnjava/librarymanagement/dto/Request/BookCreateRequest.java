package com.learnjava.librarymanagement.dto.Request;

import com.learnjava.librarymanagement.entity.Category;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
public class BookCreateRequest {

    @NotEmpty(message = "Title can't be empty")
    @Size(max = 200, message = "Title can't exceed 200 characters")
    private String title;

    @NotEmpty(message = "Author can't be empty")
    @Size(max = 100, message = "Author can't exceed 100 characters")
    private String author;

    @NotNull(message = "Pages can't be empty")
    @Min(value = 1, message = "Pages must be at least 1")
    private Integer pages;

    @NotNull(message = "Quantity can't be empty")
    @Min(value = 0, message = "Quantity must be 0 or more")
    private Integer quantity;

    @NotNull(message = "Category can't be empty")
    private Category category;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate publishDate;

    private String imageUrl;
}
