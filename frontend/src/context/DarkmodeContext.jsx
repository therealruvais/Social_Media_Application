import React, { createContext, useState } from 'react'

export const DarkContext = createContext();

const DarkmodeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  return (
    <DarkContext.Provider value={{ dark, setDark }}>
      {children}
    </DarkContext.Provider>
  );
};

export default DarkmodeProvider;