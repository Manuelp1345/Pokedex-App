import React from "react";
import { Provider } from "react-redux";
import { RouterApp } from "./router/RouterApp";
import { store } from "./store/store";

export const PokedexApp = () => {
  return (
    <Provider store={store}>
      <RouterApp />
    </Provider>
  );
};
