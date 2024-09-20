package com.virtualmasterchef.controller;

import com.virtualmasterchef.model.Recipe;
import com.virtualmasterchef.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/recetas")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @PreAuthorize("hasRole('CHEF')")
    @PostMapping
    public Recipe createRecipe(@Valid @RequestBody Recipe recipe) {
        return recipeService.createRecipe(recipe);
    }

    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @GetMapping("/{id}")
    public Recipe getRecipeById(@PathVariable Long id) {
        return recipeService.getRecipeById(id)
                .orElseThrow(() -> new RuntimeException("Receta no encontrada"));
    }

    @PreAuthorize("hasRole('CHEF')")
    @PutMapping("/{id}")
    public Recipe updateRecipe(@PathVariable Long id, @Valid @RequestBody Recipe recipeDetails) {
        Recipe recipe = recipeService.getRecipeById(id)
                .orElseThrow(() -> new RuntimeException("Receta no encontrada"));

        // Actualizar los campos de la receta
        recipe.setNombre(recipeDetails.getNombre());
        recipe.setDescripcion(recipeDetails.getDescripcion());
        recipe.setIngredientes(recipeDetails.getIngredientes());
        recipe.setInstrucciones(recipeDetails.getInstrucciones());
        recipe.setTiempoPreparacion(recipeDetails.getTiempoPreparacion());
        recipe.setDificultad(recipeDetails.getDificultad());
        recipe.setParticipante(recipeDetails.getParticipante());

        return recipeService.updateRecipe(recipe);
    }

    @PreAuthorize("hasRole('CHEF')")
    @DeleteMapping("/{id}")
    public String deleteRecipe(@PathVariable Long id) {
        recipeService.deleteRecipe(id);
        return "Receta eliminada exitosamente!";
    }

    @PreAuthorize("hasAnyRole('VISITOR', 'CHEF')")
    @PostMapping("/{id}/{voto}")
    public Recipe voteRecipe(@PathVariable Long id, @PathVariable String voto) {
        Recipe recipe = recipeService.getRecipeById(id)
                .orElseThrow(() -> new RuntimeException("Receta no encontrada"));

        if (voto.equalsIgnoreCase("positivo")) {
            recipe.setVotos(recipe.getVotos() + 1);
        } else if (voto.equalsIgnoreCase("negativo")) {
            recipe.setVotos(recipe.getVotos() - 2);
        } else {
            throw new RuntimeException("Voto inválido");
        }

        return recipeService.updateRecipe(recipe);
    }
}
