package com.learnjava.librarymanagement.service;

import com.learnjava.librarymanagement.dto.Request.LoginRequest;
import com.learnjava.librarymanagement.dto.Request.RegisterRequest;
import com.learnjava.librarymanagement.dto.Response.AuthenticationResponse;
import com.learnjava.librarymanagement.entity.Role;
import com.learnjava.librarymanagement.entity.User;
import com.learnjava.librarymanagement.repository.UserRepository;
import com.learnjava.librarymanagement.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager; // Xác thực
    private final JwtService jwtService;

    public AuthenticationResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername()))
            throw new RuntimeException("Username already exists");
        if (userRepository.existsByEmail(request.getEmail()))
            throw new RuntimeException("Email already exists");
        if (userRepository.existsByPhoneNumber(request.getPhoneNumber()))
            throw new RuntimeException("Phone number already exists");

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .role(Role.READER)
                .status(User.UserStatus.ACTIVE)
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user.getUsername());

        return AuthenticationResponse.builder()
                .token(token)
                .message("Register successful")
                .id(user.getId())
                .username(user.getUsername())
                .role(user.getRole().name())
                .build();
    }

    public AuthenticationResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtService.generateToken(user.getUsername());

        return AuthenticationResponse.builder()
                .token(token)
                .message("Login successful")
                .id(user.getId())
                .username(user.getUsername())
                .role(user.getRole().name()) 
                .build();
    }
}
