import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();
const GlobalStateProvider = ({ children }) => {
  const [selectedRoute, setSelectedRoute] = useState('/home');
  const [homeContent, setHomeContent] = useState('posts');

  return (
    <GlobalStateContext.Provider value={{ selectedRoute, setSelectedRoute, homeContent, setHomeContent }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState debe usarse dentro de un GlobalStateProvider');
  }
  return context;
};

export { GlobalStateProvider, useGlobalState };
