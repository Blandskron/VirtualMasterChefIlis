package com.virtualmasterchef.service;

import com.virtualmasterchef.model.User;
import com.virtualmasterchef.model.Role;
import com.virtualmasterchef.repository.UserRepository;
import com.virtualmasterchef.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Método para verificar si un usuario existe por su nombre de usuario
    public boolean userExistsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    // Método para encontrar un rol por su nombre
    public Optional<Role> findRoleByName(String roleName) {
        return roleRepository.findById(roleName);
    }

    // Método para guardar un usuario
    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Método para inicializar roles
    public void initRoles() {
        if (!roleRepository.existsById("chef")) {
            roleRepository.save(new Role("chef"));
        }
        if (!roleRepository.existsById("visitor")) {
            roleRepository.save(new Role("visitor"));
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                        .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        Set<GrantedAuthority> authorities = new HashSet<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName().toUpperCase()));
        });

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }
}
