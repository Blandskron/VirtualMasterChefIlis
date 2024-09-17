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

    // Crear receta (solo CHEF)
    @PostMapping
    public ResponseEntity<Recipe> createRecipe(@AuthenticationPrincipal User user, @RequestBody Recipe recipe) {
        if (user == null || !user.getRole().equals("CHEF")) {
            return ResponseEntity.status(403).build(); // Forbidden para usuarios que no son CHEF
        }
        recipe.setChef(user);
        Recipe savedRecipe = recipeRepository.save(recipe);
        return ResponseEntity.ok(savedRecipe);
    }

    // Leer todas las recetas
    @GetMapping
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        List<Recipe> recipes = recipeRepository.findAll();
        return ResponseEntity.ok(recipes);
    }

    // Obtener receta por ID (usando UUID)
    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable UUID id) {
        Optional<Recipe> recipe = recipeRepository.findById(id);
        return recipe.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Actualizar receta (usando UUID)
    @PutMapping("/{id}")
    public ResponseEntity<Recipe> updateRecipe(@AuthenticationPrincipal User user, @PathVariable UUID id, @RequestBody Recipe recipeDetails) {
        if (user == null || !user.getRole().equals("CHEF")) {
            return ResponseEntity.status(403).build(); // Forbidden para usuarios que no son CHEF
        }
        Optional<Recipe> optionalRecipe = recipeRepository.findById(id);
        if (optionalRecipe.isEmpty() || !optionalRecipe.get().getChef().equals(user)) {
            return ResponseEntity.status(403).build(); // Forbidden si no es el chef de la receta
        }

        Recipe recipe = optionalRecipe.get();
        recipe.setNombre(recipeDetails.getNombre());
        recipe.setDescripcion(recipeDetails.getDescripcion());
        recipe.setIngredientes(recipeDetails.getIngredientes());
        recipe.setInstrucciones(recipeDetails.getInstrucciones());
        Recipe updatedRecipe = recipeRepository.save(recipe);

        return ResponseEntity.ok(updatedRecipe);
    }

    // Eliminar receta (usando UUID)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@AuthenticationPrincipal User user, @PathVariable UUID id) {
        if (user == null || !user.getRole().equals("CHEF")) {
            return ResponseEntity.status(403).build(); // Forbidden para usuarios que no son CHEF
        }
        Optional<Recipe> optionalRecipe = recipeRepository.findById(id);
        if (optionalRecipe.isEmpty() || !optionalRecipe.get().getChef().equals(user)) {
            return ResponseEntity.status(403).build(); // Forbidden si no es el chef de la receta
        }

        recipeRepository.delete(optionalRecipe.get());
        return ResponseEntity.ok().build();
    }

    // Valorar receta (usando UUID)
    @PostMapping("/{id}/rate")
    public ResponseEntity<Recipe> rateRecipe(@PathVariable UUID id, @RequestParam Integer rating) {
        Optional<Recipe> optionalRecipe = recipeRepository.findById(id);
        if (optionalRecipe.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Recipe recipe = optionalRecipe.get();
        recipe.setVotos(recipe.getVotos() + rating);  // Se suma la votación al campo "votos"
        Recipe updatedRecipe = recipeRepository.save(recipe);

        return ResponseEntity.ok(updatedRecipe);
    }
}
