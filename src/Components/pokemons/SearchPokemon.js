import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPokemonFavorite,
  removePokemonFavorite,
  startSearchPokemon,
} from "../../actions/pokemons";

export const SearchPokemon = ({ match, history, id }) => {
  const dispatch = useDispatch();
  const { pokemon, search: loading } = useSelector((state) => state.Pkm);

  const search = match.params.id || id;

  const urlFetch = `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`;

  useEffect(() => {
    dispatch(startSearchPokemon(urlFetch));
  }, [search, dispatch, urlFetch]);

  return (
    <div>
      {loading ? (
        <div className=" fade-in-left pt-5 mt-5 d-flex flex-row flex-wrap align-items-center justify-content-center">
          <h1 className="col-12 pt-5 mt-5 text-center">Cargando...</h1>
          <button
            onClick={() => history.goBack()}
            className="btn col-6 btn-danger mt-5"
          >
            Volver
          </button>
        </div>
      ) : (
        <>
          <h1 className=" text-center pt-5 ">{pokemon.name}</h1>
          <div className="col-12 mt-3 d-flex justify-content-between flex-row">
            <img
              className="fade-in-left pokemon-svg col-4 img-fluid ms-5 mt-5"
              src={pokemon.img}
              alt=""
            />
            <div className="pokemon-card col-6 mt-5 p-1 justify-content-sm-between card ms-3 me-5 border-5 border-danger  ">
              <h2 className="mt-2 text-center">
                Caracteristicas de {pokemon.name}
              </h2>
              <ul className="ms-5 mt-3 d-flex flex-column ">
                <li className="list-inline-item lead font-monospace">
                  Id: {pokemon.id}
                </li>
                <li className="list-inline-item lead font-monospace">
                  Habilidades:
                  <ul>
                    {pokemon.abilities?.map((abilitie) => (
                      <li key={abilitie.ability.name}>
                        {abilitie.ability.name}
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="list-inline-item lead font-monospace">
                  Tipo:{" "}
                  <ul>
                    {pokemon.type?.map((type) => (
                      <li key={type.type.name}>{type.type.name}</li>
                    ))}
                  </ul>
                </li>
              </ul>
              <div className="col-12">
                <button
                  onClick={() => dispatch(addPokemonFavorite(pokemon.name))}
                  className="btn col-12 btn-dark mt-5"
                >
                  Añardir a favoritos
                </button>
                <button
                  onClick={() => dispatch(removePokemonFavorite(pokemon.name))}
                  className="btn col-12 btn-warning mt-1"
                >
                  Eliminar de favoritos
                </button>
                <button
                  onClick={() => history.goBack()}
                  className="btn col-12 btn-danger mt-1"
                >
                  Volver
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
