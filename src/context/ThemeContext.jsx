import React, { createContext, useState } from "react";
export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState("#000000");

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

