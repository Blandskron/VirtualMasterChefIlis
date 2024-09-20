package com.virtualmasterchef.repository;

import com.virtualmasterchef.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}
