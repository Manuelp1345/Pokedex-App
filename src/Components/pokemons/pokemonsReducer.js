import { types } from "../../types/types";

const initialState = {
  pokemons: [],
  loading: true,
  pokemon: {},
  search: true,
  favoritos: [],
  url: "https://pokeapi.co/api/v2/pokemon?limit=12",
};
export const pokemonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.allPokemons:
      return {
        ...state,
        pokemons: action.payload,
        loading: false,
      };

    case types.NextAndPrevius:
      return {
        ...state,
        loading: true,
      };
    case types.OnePokemon:
      return {
        ...state,
        search: false,
        pokemon: action.payload,
      };
    case types.reloadPokemon:
      return {
        ...state,
        pokemon: {},
        search: true,
      };
    case types.UpgradeUrl:
      return {
        ...state,
        url: action.payload,
      };
    case types.Favoritos:
      return {
        ...state,
        favoritos: action.payload,
      };
    default:
      return state;
  }
};
