package com.virtualmasterchef.controller;

import com.virtualmasterchef.dto.UserDTO;
import com.virtualmasterchef.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Cambiar el endpoint para evitar conflicto con AuthController
    @PostMapping("/register")
    public String registerUser(@RequestBody UserDTO userDTO) {
        if (userService.userExistsByUsername(userDTO.getUsername())) {
            return "El nombre de usuario ya está en uso!";
        }
        userService.registerNewUser(userDTO);
        return "Usuario registrado exitosamente en UserController!";
    }
}
