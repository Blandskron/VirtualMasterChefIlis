package com.virtualmasterchef.services;

import com.virtualmasterchef.dtos.RecipeDTO;
import com.virtualmasterchef.models.Recipe;
import com.virtualmasterchef.models.User;
import com.virtualmasterchef.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    public Recipe createRecipe(RecipeDTO recipeDTO, User chef) {
        Recipe recipe = new Recipe();
        recipe.setNombre(recipeDTO.getNombre());
        recipe.setDescripcion(recipeDTO.getDescripcion());
        recipe.setIngredientes(recipeDTO.getIngredientes());
        recipe.setInstrucciones(recipeDTO.getInstrucciones());
        recipe.setChef(chef);

        return recipeRepository.save(recipe);
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

}
