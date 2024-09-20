package com.virtualmasterchef.controller;

import com.virtualmasterchef.model.User;
import com.virtualmasterchef.model.Role;
import com.virtualmasterchef.service.UserService;
import com.virtualmasterchef.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthController(UserService userService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    // Registro general de usuario, se le agrega un sufijo a la ruta para diferenciarla
    @PostMapping("/register/general")
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

    // Registro de chefs
    @PostMapping("/register/chef")
    public String registerChef(@RequestBody User user) {
        Set<Role> roles = new HashSet<>();
        Role role = userService.findRoleByName("chef").orElse(new Role("chef"));
        roles.add(role);
        user.setRoles(roles);
        userService.saveUser(user);
        return "Chef registrado exitosamente!";
    }

    // Endpoint de login
    @PostMapping("/login")
    public String login(@RequestBody User user) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(), user.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return "Usuario autenticado exitosamente!";
    }
}
