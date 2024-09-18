package com.virtualmasterchef.controllers;

import com.virtualmasterchef.dto.UserDTO;
import com.virtualmasterchef.models.User;
import com.virtualmasterchef.services.UserService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@Valid @RequestBody UserDTO userDTO) {
        User newUser = userService.registerUser(userDTO);
        return ResponseEntity.ok(newUser);
    }
}
