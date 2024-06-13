import React, { createContext, useState, useContext } from 'react';

// Create a context
const StoreContext = createContext();

// Create a provider component
export const StoreProvider = ({ children }) => {
  const [state, setState] = useState({
    showUploadContent: true,
  });

  // Function to change the page when image is uploaded
  const changeUploadPage = (value) => {
    setState((prevState) => ({
      ...prevState,
      showUploadContent: value,
    }));
  };

  return (
    <StoreContext.Provider value={{ state, changeUploadPage }}>
      {children}
    </StoreContext.Provider>
  );
};

// use store
export const useStore = () => useContext(StoreContext);