import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Favoritos } from "../Components/pokemons/Favoritos";
import { PokemonsScreen } from "../Components/pokemons/PokemonsScreen";
import { SearchPokemon } from "../Components/pokemons/SearchPokemon";

export const RouterApp = () => {
  return (
    <Router>
      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={PokemonsScreen} />
          <Route exact path="/favoritos" component={Favoritos} />
          <Route exact path="/search/:id" component={SearchPokemon} />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
