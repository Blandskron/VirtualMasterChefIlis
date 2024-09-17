package com.virtualmasterchef.controllers;

import com.virtualmasterchef.models.Recipe;
import com.virtualmasterchef.models.User;
import com.virtualmasterchef.repositories.RecipeRepository;
import com.virtualmasterchef.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;

    // Crear receta (solo CHEF)
    @PostMapping
    public Recipe createRecipe(@AuthenticationPrincipal User user, @RequestBody Recipe recipe) {
        recipe.setChef(user);
        return recipeRepository.save(recipe);
    }

    // Leer todas las recetas
    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    // Obtener receta por ID
    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        Recipe recipe = recipeRepository.findById(id).orElse(null);
        return ResponseEntity.ok(recipe);
    }

    // Actualizar receta (solo CHEF)
    @PutMapping("/{id}")
    public ResponseEntity<Recipe> updateRecipe(@AuthenticationPrincipal User user, @PathVariable Long id, @RequestBody Recipe recipeDetails) {
        Recipe recipe = recipeRepository.findById(id).orElse(null);
        if (recipe == null || !recipe.getChef().equals(user)) {
            return ResponseEntity.status(403).build(); // Forbidden
        }
        recipe.setNombre(recipeDetails.getNombre());
        recipe.setDescripcion(recipeDetails.getDescripcion());
        recipe.setIngredientes(recipeDetails.getIngredientes());
        recipe.setInstrucciones(recipeDetails.getInstrucciones());
        return ResponseEntity.ok(recipeRepository.save(recipe));
    }

    // Eliminar receta (solo CHEF)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@AuthenticationPrincipal User user, @PathVariable Long id) {
        Recipe recipe = recipeRepository.findById(id).orElse(null);
        if (recipe == null || !recipe.getChef().equals(user)) {
            return ResponseEntity.status(403).build(); // Forbidden
        }
        recipeRepository.delete(recipe);
        return ResponseEntity.ok().build();
    }

    // Valorar receta (acceso para VISITOR y CHEF)
    @PostMapping("/{id}/rate")
    public ResponseEntity<Recipe> rateRecipe(@PathVariable Long id, @RequestParam Integer rating) {
        Recipe recipe = recipeRepository.findById(id).orElse(null);
        if (recipe == null) {
            return ResponseEntity.notFound().build();
        }
        recipe.setVotos(recipe.getVotos() + rating);  // Se suma la votación al campo "votos"
        return ResponseEntity.ok(recipeRepository.save(recipe));
    }
}
