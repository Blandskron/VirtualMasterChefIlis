package com.virtualmasterchef.repository;

import com.virtualmasterchef.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, String> {
}
