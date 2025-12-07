package com.learnjava.librarymanagement.dto.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String token;
    private String message;
    // Thêm các trường này để Frontend dùng
    private Long id;
    private String username;
    private String role; 
}