import React from "react";
import { useForm } from "../../hooks/useForm";
import { Pokemons } from "./Pokemons";

export const PokemonsScreen = ({ history }) => {
  const año = new Date();

  const {
    values: { search },
    handleInputChange,
  } = useForm({
    search: "",
  });

  const hanldSubmit = (e) => {
    e.preventDefault();

    history.push(`/search/${search}`);
  };

  return (
    <>
      <div className="col-12 align-items-center ">
        <h1 className=" text-center my-2 text-danger">Pokedex</h1>
        <form onSubmit={hanldSubmit}>
          <input
            className=" form-control form-text px-5 mb-3 "
            type="text"
            name="search"
            placeholder="Busca tu pokemon favorito"
            onChange={handleInputChange}
            value={search}
          />
        </form>
      </div>
      <Pokemons history={history} />
      <div>
        <p className="text-center">
          {" "}
          Pokedex Desarrollada y deseñada por{" "}
          <a href="https://manueldev.web.app/">Manueldev</a>, ©
          {año.getFullYear()} Todos los derechos reservados
        </p>
      </div>
    </>
  );
};
