package com.learnjava.librarymanagement.repository;

import com.learnjava.librarymanagement.entity.Book;
import com.learnjava.librarymanagement.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    // Đừng override findById/save/deleteById/findAll — dùng mặc định của JpaRepository:
    // Optional<Book> findById(Long id)
    // <S extends Book> S save(S entity)
    // void deleteById(Long id)
    // List<Book> findAll()

    // Các truy vấn bổ sung
    List<Book> findByTitle(String title);

    List<Book> findByCategory(Category category);

    List<Book> findByQuantity(int quantity);

    List<Book> findByAuthor(String author);

    @Query("""
           SELECT b FROM Book b 
           WHERE LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
              OR LOWER(b.author) LIKE LOWER(CONCAT('%', :keyword, '%'))
              OR LOWER(b.category.categoryName) LIKE LOWER(CONCAT('%', :keyword, '%'))
           """)
    List<Book> search(@Param("keyword") String keyword);
}