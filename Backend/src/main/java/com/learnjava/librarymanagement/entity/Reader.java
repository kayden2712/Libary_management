package com.learnjava.librarymanagement.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "readers")
@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Reader extends User {

    // Bạn có thể thêm trường riêng của Reader nếu muốn
    // Ví dụ: private String membershipNumber;

    // Builder sẽ tự động gán Role.READER
    public static Reader create(String username, String email, String password, String phoneNumber, String address) {
        return Reader.builder()
                .username(username)
                .email(email)
                .password(password)
                .phoneNumber(phoneNumber)
                .address(address)
                .role(Role.READER)  // Role mặc định cho Reader
                .status(UserStatus.ACTIVE)
                .build();
    }
}
