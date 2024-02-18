import React from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  return (
    <AuthContext.Provider value={{}}>{props.children}</AuthContext.Provider>
  );
};
