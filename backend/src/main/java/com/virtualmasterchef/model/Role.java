package com.virtualmasterchef.model;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    private String name; // 'chef' o 'visitor'

    public Role() {
    }

    public Role(String name) {
        this.name = name;
    }

    // Getters y Setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    } 
}
