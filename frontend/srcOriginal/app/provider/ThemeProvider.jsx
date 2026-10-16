import React, { Children } from "react";
import { ThemeContext } from "../context/ThemeContext";
import useDarkMode from "../hooks/useDarkMode";

function ThemeProvider({children}) {
  const [isDark, toggleDark] = useDarkMode();
  return (
    <ThemeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
