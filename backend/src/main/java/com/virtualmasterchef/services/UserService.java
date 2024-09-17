package com.virtualmasterchef.services;

import com.virtualmasterchef.dto.UserDTO;
import com.virtualmasterchef.models.User;
import com.virtualmasterchef.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    // Codificador de contraseñas
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Método para registrar un usuario
    public User registerUser(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        // Codificar la contraseña antes de guardarla
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setRole(userDTO.getRole());
        return userRepository.save(user);
    }

    // Implementación del método de Spring Security para cargar un usuario por nombre de usuario
    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
