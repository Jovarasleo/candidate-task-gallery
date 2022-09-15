import { useState, useEffect } from "react";

const THEME_KEY = "THEME_KEY";

function useSelectTheme() {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const data = localStorage.getItem(THEME_KEY) || "dark";
    document.documentElement.setAttribute("data-theme", theme);
    setTheme(data);
  }, [theme]);

  const toggleTheme = ():void => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem(THEME_KEY, "dark");
    } else {
      setTheme("light");
      localStorage.setItem(THEME_KEY, "light");
    }
  };
  return { theme, toggleTheme };
}
export default useSelectTheme;
