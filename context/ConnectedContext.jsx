"use client";
import React, { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  isConnected: true,
};

const ConnectedReducer = (state, action) => {
  switch (action.type) {
    case "SET_CONNECTED":
      return { ...state, isConnected: action.payload };
    default:
      return state;
  }
};

const ConnectedContext = createContext();

// Création du fournisseur de contexte
export const ConnectedProvider = ({ children }) => {
  const [state, dispatchConnection] = useReducer(
    ConnectedReducer,
    initialState
  );

  const updateConnection = (bool) => {
    dispatchConnection({
      type: "SET_CONNECTED",
      payload: bool,
    });
  };

  const checkConnection = async () => {
    const isConnected = await fetch("/api/isConnected");
    if (isConnected.ok) {
      updateConnection(true);
    } else {
      updateConnection(false);
    }
  };
  useEffect(() => {
    checkConnection(); // Vérifie la connexion lors de l'initialisation
    //eslint-disable-next-line
  }, []);

  return (
    <ConnectedContext.Provider
      value={{ state, updateConnection, checkConnection }}
    >
      {children}
    </ConnectedContext.Provider>
  );
};

// 3. Création du hook personnalisé pour utiliser le contexte
export const useConnected = () => {
  const context = useContext(ConnectedContext);
  if (!context) {
    throw new Error(
      "useConnected doit être utilisé à l'intérieur de ConnectedProvider"
    );
  }
  return context;
};

export default ConnectedContext;
