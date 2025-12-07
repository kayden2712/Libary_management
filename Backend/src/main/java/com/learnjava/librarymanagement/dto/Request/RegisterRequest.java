package com.learnjava.librarymanagement.dto.Request;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private String phoneNumber;

}
