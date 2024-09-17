package com.virtualmasterchef.repositories;

import com.virtualmasterchef.models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface RecipeRepository extends JpaRepository<Recipe, UUID> {
}
