import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startFavorite } from "../../actions/pokemons";
import { Pokemon } from "./Pokemon";

export const Favoritos = ({ history }) => {
  const dispatch = useDispatch();

  const { favoritos } = useSelector((state) => state.Pkm);

  useEffect(() => {
    dispatch(startFavorite());
  }, [dispatch]);

  return (
    <>
      <button
        className="btn btn-close m-3"
        onClick={() => history.goBack()}
      ></button>{" "}
      <div className=" justify-content-center align-items-center d-flex flex-row flex-wrap fade-in-bottom">
        {favoritos.map((pokemon) => (
          <Pokemon key={pokemon.id} {...pokemon} history={history} />
        ))}
      </div>
      <button
        className="btn btn-close m-3"
        onClick={() => history.goBack()}
      ></button>{" "}
    </>
  );
};
