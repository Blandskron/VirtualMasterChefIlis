package com.virtualmasterchef.controllers;

import com.virtualmasterchef.models.Recipe;
import com.virtualmasterchef.models.User;
import com.virtualmasterchef.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @PostMapping
    public ResponseEntity<Recipe> createRecipe(@AuthenticationPrincipal User user, @RequestBody Recipe recipe) {
        if (user == null || !user.getRole().equals("CHEF")) {
            return ResponseEntity.status(403).build();
        }
        recipe.setChef(user);
        Recipe savedRecipe = recipeRepository.save(recipe);
        return ResponseEntity.ok(savedRecipe);
    }

    @GetMapping
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        List<Recipe> recipes = recipeRepository.findAll();
        return ResponseEntity.ok(recipes);
    }

    @PostMapping("/{id}/rate")
    public ResponseEntity<Recipe> rateRecipe(@AuthenticationPrincipal User user, @PathVariable UUID id, @RequestParam Integer rating) {
        if (user == null || !user.getRole().equals("VISITOR")) {
            return ResponseEntity.status(403).build();
        }
        Optional<Recipe> optionalRecipe = recipeRepository.findById(id);
        if (optionalRecipe.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Recipe recipe = optionalRecipe.get();
        recipe.setVotos(recipe.getVotos() + rating);
        Recipe updatedRecipe = recipeRepository.save(recipe);

        return ResponseEntity.ok(updatedRecipe);
    }
}
