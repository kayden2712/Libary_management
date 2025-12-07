package com.learnjava.librarymanagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Entity
@Table(name = "books")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Long id;

    @NotEmpty
    @Size(max = 200)
    @Column(name = "title", nullable = false)
    private String title;

    @NotEmpty
    @Size(max = 100)
    @Column(name = "author", nullable = false)
    private String author;

    @Min(1)
    @NotNull
    @Column(name = "pages", nullable = false)
    private Integer pages;

    @Min(0)
    @NotNull
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "area_id", nullable = false)
    private Area area;

    @Column(name = "publish_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate publishDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    @Builder.Default
    private BookStatus status = BookStatus.AVAILABLE;

    @Column(name = "image_url")
    private String imageUrl;

    public boolean isAvailable() {
        return quantity > 0 && status == BookStatus.AVAILABLE;
    }

    public void updateStatus() {
        if (isAvailable()) status = BookStatus.AVAILABLE;
        else status = BookStatus.OUT_OF_STOCK;
    }

    public enum BookStatus {
        OUT_OF_STOCK,
        AVAILABLE
    }
}
