import React, { createContext, useContext, useState } from "react";

const ToggleContext = createContext();
export const useToggle = () => useContext(ToggleContext);

const ToggleProvider = ({ children }) => {
  const [toggle, setToggle] = useState(true);
  return (
    <ToggleContext.Provider value={{ toggle, setToggle }}>
      {children}
    </ToggleContext.Provider>
  );
};

export default ToggleProvider;
