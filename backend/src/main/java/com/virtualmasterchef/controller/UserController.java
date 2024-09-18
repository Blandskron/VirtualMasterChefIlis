package com.virtualmasterchef.controller;

import com.virtualmasterchef.model.User;
import com.virtualmasterchef.model.Role;
import com.virtualmasterchef.service.UserService;
import com.virtualmasterchef.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody UserDTO userDTO) {
        if (userService.userExistsByUsername(userDTO.getUsername())) {
            return "El nombre de usuario ya está en uso!";
        }

        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());

        Set<Role> roles = new HashSet<>();
        String roleName = userDTO.getRole() != null ? userDTO.getRole() : "visitor";
        Role role = userService.findRoleByName(roleName).orElse(new Role(roleName));
        roles.add(role);
        user.setRoles(roles);

        userService.saveUser(user);
        return "Usuario registrado exitosamente!";
    }

    // Otros métodos...
}
