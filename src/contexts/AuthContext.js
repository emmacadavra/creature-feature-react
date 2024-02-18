import React from "react";
import { createContext, useState, useContext } from "react";

export const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: null,
});

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  return authContextValue;
};
