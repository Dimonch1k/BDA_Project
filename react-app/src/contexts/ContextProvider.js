import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loginUser = (userData) => setUser(userData);
  const logoutUser = () => setUser(null);

  return (
    <StateContext.Provider
      value={{
        user,
        searchTerm,
        loginUser,
        logoutUser,
        setSearchTerm,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
