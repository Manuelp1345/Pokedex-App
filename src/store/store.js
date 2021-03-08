import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { pokemonsReducer } from "../Components/pokemons/pokemonsReducer";

const composeEnhancers = compose;

const reducers = combineReducers({
  Pkm: pokemonsReducer,
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
