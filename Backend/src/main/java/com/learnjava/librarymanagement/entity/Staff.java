package com.learnjava.librarymanagement.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "staff")
@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Staff extends User {
    // Builder mặc định Role.LIBRARIAN
    public static Staff create(String username, String email, String password, String phoneNumber, String address) {
        return Staff.builder()
                .username(username)
                .email(email)
                .password(password)
                .phoneNumber(phoneNumber)
                .address(address)
                .role(Role.LIBRARIAN) // Role mặc định cho Staff
                .status(UserStatus.ACTIVE)
                .build();
    }
}
