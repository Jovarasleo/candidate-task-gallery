import "../styles/globals.css";
import type { AppProps } from "next/app";
import Home from "./index";
import { FavouritesProvider } from "../context/FavouritesContext";
import { ThemeProvider } from "../context/themeContext";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <FavouritesProvider>
        {/* <Home /> */}
        <Component {...pageProps} />
      </FavouritesProvider>
    </ThemeProvider>
  );
}

export default MyApp;
