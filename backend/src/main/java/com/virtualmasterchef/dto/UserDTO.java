package com.virtualmasterchef.dto;

public class UserDTO {

    private String username;
    private String password;
    private String role;

    // Constructores

    public UserDTO() {
    }

    public UserDTO(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    // Getters y Setters

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
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
}
