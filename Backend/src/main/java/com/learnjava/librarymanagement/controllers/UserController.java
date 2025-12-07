package com.learnjava.librarymanagement.controllers;

import com.learnjava.librarymanagement.entity.User;
import com.learnjava.librarymanagement.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Lấy thông tin tất cả người dùng
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // Lấy thông tin theo id
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    // Cập nhập thông tin user
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable long id, @Valid @RequestBody User updateUser) {
        // ensure the service updates the correct user by path id
        updateUser.setId(id);
        return ResponseEntity.ok(userService.updateUser(updateUser));
    }

    // Đổi mật khẩu
    @PutMapping("/{id}/reset")
    public void changePassword(@PathVariable long id,
                               @RequestParam String oldPassword,
                               @RequestParam String newPassword) {
        userService.changePassword(id, oldPassword, newPassword);
    }

    // Xóa User
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable long id) {
        userService.deleteUser(id);
    }

    // Lock account
    @PutMapping("/{id}/lock")
    public ResponseEntity<String> lockUser(@PathVariable long id) {
        userService.lockUser(id);
        return ResponseEntity.ok("User is locked");
    }

    //Unlock account
    @PutMapping("/{id}/unlock")
    public ResponseEntity<String> unlockUser(@PathVariable long id) {
        userService.unlockUser(id);
        return ResponseEntity.ok("User is unlocked");
    }
}