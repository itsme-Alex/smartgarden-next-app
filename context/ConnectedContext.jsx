"use client";
import React, { createContext, useContext, useEffect, useReducer } from "react";

const ConnectedContext = createContext();

// Création du fournisseur de contexte
export const ConnectedProvider = ({ children }) => {
  const [state, setState] = useState(true);

  const updateConnection = (bool) => {
    setState(bool);
  };
  const checkConnection = async () => {
    const isConnected = await fetch("/api/isConnected");
    if (isConnected.ok) {
      setState(true);
    } else {
      setState(false);
    }
  };

  useEffect(() => {
    checkConnection(); // Vérifie la connexion lors de l'initialisation
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

export default useConnected;
