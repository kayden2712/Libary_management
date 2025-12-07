package com.learnjava.librarymanagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "areas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "books")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Area {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    @Column(name = "area_id")
    private Long areaId;

    @NotBlank 
    @Column(name = "area_name", nullable = false, length = 100)
    private String areaName;

    // Giữ column cũ "decription" để tương thích DB
    @NotBlank
    @Column(name = "decription", nullable = false, length = 255)
    private String description;

    @OneToMany(mappedBy = "area", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Book> books = new ArrayList<>();

    public void addBook(Book book) {
        if (book == null) return;
        books.add(book);
        book.setArea(this);
    }

    public void removeBook(Book book) {
        if (book == null) return;
        books.remove(book);
        book.setArea(null);
    }
}
