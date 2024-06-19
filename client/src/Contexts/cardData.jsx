import React, { createContext, useState } from "react";

// Create a context
const ContextData = createContext();

function ContextProvider(props) {

  const [cardId, setState] = useState('default');

  return (
    
    <ContextData.Provider value={{ cardId, setState }}>
      {props.children}
    </ContextData.Provider>
  );
}

export { ContextProvider, ContextData };
