import Swal from "sweetalert2";
import { types } from "../types/types";

export const startLoadPokemons = (urlFetch) => {
  return async (dispatch) => {
    await fetch(urlFetch)
      .then((e) => e.json())
      .then((e) => {
        const resp = e.results;

        const pagination = {
          next: e.next,
          previous: e.previous,
        };
        let pokemons = [];

        for (let i = 0; i < resp.length; i++) {
          const element = resp[i];
          fetch(element.url)
            .then((res) => res.json())
            .then((res) => {
              pokemons.push({
                id: res.id,
                name: res.name,
                types: res.types,
                img: res.sprites.other.dream_world.front_default,
              });
              if (pokemons.length > 8) {
                dispatch(
                  savePokemons({
                    pokemons,
                    pagination,
                  })
                );
              }
            });
        }
      })
      .catch((e) =>
        Swal.fire({
          title: "Ops",
          html: "La pokedex a tenido un error. <br>/<br> Intenta mas tarde",
          icon: "error",
        })
      );
  };
};
export const savePokemons = (pokemons) => ({
  type: types.allPokemons,
  payload: pokemons,
});

export const startLoadingNextOrPrevous = () => ({ type: types.NextAndPrevius });

export const startSearchPokemon = (urlFetch) => {
  return async (dispatch) => {
    dispatch(reloadPokemon());
    await fetch(urlFetch)
      .then((e) => e.json())
      .then((e) => {
        const pokemon = {
          name: e.name,
          id: e.id,
          abilities: e.abilities,
          img: e.sprites.other.dream_world.front_default,
          type: e.types,
        };
        dispatch(savePokemon(pokemon));
      })
      .catch((e) =>
        Swal.fire({
          title: "Ops",
          html:
            "Pokemon no registrado en nuestra pokedex. <br>/<br> Intenta mas tarde",
          icon: "error",
        })
      );
  };
};

export const reloadPokemon = () => ({
  type: types.reloadPokemon,
});
export const savePokemon = (pokemon) => ({
  type: types.OnePokemon,
  payload: pokemon,
});

export const upgradeUrl = (url) => ({
  type: types.UpgradeUrl,
  payload: url,
});

export const addPokemonFavorite = (name) => {
  return () => {
    if (localStorage.getItem("pokemons")) {
      const pokemons = JSON.parse(localStorage.getItem("pokemons"));
      if (pokemons.indexOf(name) === -1) {
        pokemons.push(name);
        localStorage.setItem("pokemons", JSON.stringify(pokemons));
      }
    } else {
      const pokemon = [name];
      localStorage.setItem("pokemons", JSON.stringify(pokemon));
    }
    Swal.fire("Pokedex", `${name} Añadido a favoritos`, "success");
  };
};

export const startFavorite = () => {
  return (dispatch) => {
    const pokemons = JSON.parse(localStorage.getItem("pokemons"));
    let favoritos = [];

    for (let i = 0; i < pokemons.length; i++) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemons[i]}`)
        .then((resp) => resp.json())
        .then((resp) => {
          favoritos.push({
            id: resp.id,
            name: resp.name,
            types: resp.types,
            img: resp.sprites.other.dream_world.front_default,
          });

          if (pokemons.length - 1 === i) {
            dispatch(stateFavorite(favoritos));
          }
        })
        .catch((e) =>
          Swal.fire({
            title: "Ops",
            html:
              "Tus pokemons favoritos se han ido :(. <br>/<br> Intenta mas tarde",
            icon: "error",
          })
        );
    }
  };
};

export const stateFavorite = (fav) => ({ type: types.Favoritos, payload: fav });

export const removePokemonFavorite = (name) => {
  return (dispatch) => {
    const pokemons = JSON.parse(localStorage.getItem("pokemons"));
    const newPokemons = pokemons.filter((pokemon) => pokemon !== name);
    localStorage.setItem("pokemons", JSON.stringify(newPokemons));
    dispatch(stateFavorite(newPokemons));
    Swal.fire("Pokedex", `${name} eliminado de favoritos`, "success");
  };
};
