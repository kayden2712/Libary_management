package com.learnjava.librarymanagement.repository;

import com.learnjava.librarymanagement.entity.Borrow;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BorrowRepository extends CrudRepository<Borrow, Long> {

    // Lấy tất cả bản ghi có trạng thái BORROWED
    List<Borrow> findByStatus(Borrow.BorrowStatus status);

    // Sửa tên method đúng
    List<Borrow> findByUser_Id(Long userId);

    // Cập nhật trạng thái OVERDUE cho các bản ghi quá hạn
    @Modifying
    @Query("UPDATE Borrow b SET b.status = 'OVERDUE' WHERE b.status = 'BORROWED' AND b.dueDate < :today")
    void markOverdue(@Param("today") LocalDate today);
}

