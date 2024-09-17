package com.virtualmasterchef.repositories;

import com.virtualmasterchef.models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}
