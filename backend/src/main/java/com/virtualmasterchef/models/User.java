package com.virtualmasterchef.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    private String role; // "CHEF" o "VISITOR"

    @OneToMany(mappedBy = "chef")
    private List<Recipe> recipes;

    // Implementación de los métodos de la interfaz UserDetails

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Cambia según la lógica que desees implementar
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Cambia según la lógica que desees implementar
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Cambia según la lógica que desees implementar
    }

    @Override
    public boolean isEnabled() {
        return true; // Cambia según la lógica que desees implementar
    }

    // Getters y Setters

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<Recipe> getRecipes() {
        return recipes;
    }

    public void setRecipes(List<Recipe> recipes) {
        this.recipes = recipes;
    }
}
