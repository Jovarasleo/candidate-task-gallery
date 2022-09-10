import { createContext, useState, useEffect } from "react";
const THEME_KEY = "THEME_KEY";

const ThemeContext = createContext();
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState();
  useEffect(() => {
    const data = localStorage.getItem(THEME_KEY) || "dark";
    document.documentElement.setAttribute("data-theme", theme);
    setTheme(data);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "light") {
      localStorage.setItem(THEME_KEY, "dark");
      setTheme("dark");
    } else {
      setTheme("light");
      localStorage.setItem(THEME_KEY, "light");
    }
  };
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
export default ThemeContext;
export { ThemeProvider };
