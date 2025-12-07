package com.learnjava.librarymanagement.controllers;

import com.learnjava.librarymanagement.dto.Request.LoginRequest;
import com.learnjava.librarymanagement.dto.Request.RegisterRequest;
import com.learnjava.librarymanagement.dto.Response.AuthenticationResponse;
import com.learnjava.librarymanagement.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest request) {
        System.out.println("Login request received: " + request.getUsername() + " / " + request.getPassword());
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/forgot")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        return ResponseEntity.ok("Reset link sent to " + email);
    }
}
