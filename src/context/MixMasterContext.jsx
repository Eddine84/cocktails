import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const useMixMasterContext = createContext();
const getInitialDarkMode = () => {
  const storedDarkMode = localStorage.getItem("darkTheme");

  if (storedDarkMode === null) {
    return window.matchMedia("(prefers-color-scheme:dark)").matches;
  }
  return storedDarkMode === "true";
};

export const MixMasterContext = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode());
  const toggleDarkMode = () => {
    const currentDarkMode = !isDarkMode;
    setIsDarkMode(currentDarkMode);

    localStorage.setItem("darkTheme", currentDarkMode);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkMode);
  }, [isDarkMode]);

  return (
    <useMixMasterContext.Provider value={{ toggleDarkMode, isDarkMode }}>
      {children}
    </useMixMasterContext.Provider>
  );
};
