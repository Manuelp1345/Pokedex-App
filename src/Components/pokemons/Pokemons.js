import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startLoadingNextOrPrevous,
  startLoadPokemons,
  upgradeUrl,
} from "../../actions/pokemons";
import { Pokemon } from "./Pokemon";

export const Pokemons = ({ history }) => {
  const dispatch = useDispatch();

  const { pokemons: pkms, loading, url } = useSelector((state) => state.Pkm);

  const [urlFetch, seturlFetch] = useState(url);
  const { pokemons } = pkms;

  let btn = true;

  if (
    urlFetch === "https://pokeapi.co/api/v2/pokemon?offset=0&limit=12" ||
    urlFetch === "https://pokeapi.co/api/v2/pokemon?limit=12"
  ) {
    btn = true;
  } else {
    btn = false;
  }

  useEffect(() => {
    dispatch(startLoadPokemons(urlFetch));
    dispatch(upgradeUrl(urlFetch));
  }, [urlFetch, dispatch]);

  const handNext = (url) => {
    dispatch(startLoadingNextOrPrevous());
    seturlFetch(url);
  };

  const handPrevious = (url) => {
    dispatch(startLoadingNextOrPrevous());
    seturlFetch(url);
  };
  return (
    <ul className="fade-in-left card-pokemon pt-4  col-12 mt-1  list-group list-group-flush d-flex flex-wrap flex-row justify-content-center">
      {loading ? (
        <h1 className=" mb-5 text-center ">Cargando...</h1>
      ) : (
        <>
          {pokemons.map((pokemon) => (
            <Pokemon key={pokemon.name} {...pokemon} history={history} />
          ))}
          <div className="d-flex flex-wrap flex-row col-12 justify-content-between">
            <button
              onClick={() => handPrevious(pkms?.pagination.previous)}
              className="btn btn-dark mx-5 m-4 px-5 "
              disabled={btn}
            >
              Atras
            </button>
            <button
              onClick={() => history.push("/favoritos")}
              className="btn btn-secondary mx-5 m-4 px-5 "
            >
              Pokemons Favoritos
            </button>
            <button
              onClick={() => handNext(pkms?.pagination.next)}
              className="btn btn-danger mx-5 m-4 px-5 "
            >
              siguiente
            </button>
          </div>
        </>
      )}
    </ul>
  );
};
