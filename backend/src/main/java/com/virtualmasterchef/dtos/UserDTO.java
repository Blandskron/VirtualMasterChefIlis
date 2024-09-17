package com.virtualmasterchef.dtos;

import java.util.UUID;

public class UserDTO {

    private UUID id;
    private String username;
    private String role;  // "CHEF" o "VISITOR"

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
