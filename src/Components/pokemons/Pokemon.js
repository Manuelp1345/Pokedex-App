import React from "react";

export const Pokemon = ({ name, img, id, history }) => {
  const handlePokemon = () => {
    history.push(`/search/${name}`);
  };

  return (
    <li
      onClick={handlePokemon}
      className="list-group-item hover col-md-2 card m-1 mb-4 shadow d-flex justify-content-between"
    >
      <h4 className=" card-title">
        {name} <span>#{id}</span>
      </h4>
      <div className="card-pokemon ">
        <img className="shadow-pokemon card-img" src={img} alt="" />
      </div>
    </li>
  );
};
