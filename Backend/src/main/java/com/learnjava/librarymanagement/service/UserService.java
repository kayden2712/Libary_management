package com.learnjava.librarymanagement.service;

import com.learnjava.librarymanagement.entity.User;
import com.learnjava.librarymanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() { return userRepository.findAll(); }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateUser(User user) {
        User existing = getUserById(user.getId());
        existing.setUsername(user.getUsername());
        existing.setEmail(user.getEmail());
        existing.setPhoneNumber(user.getPhoneNumber());
        return userRepository.save(existing);
    }

    public void deleteUser(Long id) {
        User existing = getUserById(id);
        userRepository.delete(existing);
    }

    public void changePassword(Long id, String oldPassword, String newPassword) {
        User user = getUserById(id);
        if (!passwordEncoder.matches(oldPassword, user.getPassword()))
            throw new RuntimeException("Old password incorrect");
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public void lockUser(Long id) {
        User user = getUserById(id);
        if (user.getStatus() == User.UserStatus.LOCKED)
            throw new RuntimeException("User already locked");
        user.setStatus(User.UserStatus.LOCKED);
        userRepository.save(user);
    }

    public void unlockUser(Long id) {
        User user = getUserById(id);
        if (user.getStatus() == User.UserStatus.ACTIVE)
            throw new RuntimeException("User already active");
        user.setStatus(User.UserStatus.ACTIVE);
        userRepository.save(user);
    }
}
