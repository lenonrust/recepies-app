import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Explorer from '../pages/Explorer';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFoodsByIngredients from '../pages/ExploreFoodsByIngredients';
import ExploreFoodsByNationalities from '../pages/ExploreFoodsByNationalities';
import ExploreDrinksByIngredients from '../pages/ExploreDrinksByIngredients';
import FoodDetails from '../pages/FoodDetails';
import DrinkDetails from '../pages/DrinkDetails';
import NotFound from '../pages/NotFound';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/explore" component={ Explorer } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route
        exact
        path="/explore/foods/ingredients"
        component={ ExploreFoodsByIngredients }
      />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ ExploreFoodsByNationalities }
      />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route
        exact
        path="/explore/drinks/ingredients"
        component={ ExploreDrinksByIngredients }
      />
      <Route exact path="/explore" component={ Explorer } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/foods/:id" component={ FoodDetails } />
      <Route exact path="/drinks/:id" component={ DrinkDetails } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default Routes;

// Tela de detalhes de uma receita de comida: /foods/:id;
// Tela de detalhes de uma receita de bebida: /drinks/:id;
// Tela de receita em progresso de comida: /foods/{id-da-receita}/in-progress;
// Tela de receita em progresso de bebida: /drinks/{id-da-receita}/in-progress;
