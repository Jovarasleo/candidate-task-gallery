import "../styles/globals.css";
import type { AppProps } from "next/app";
import { FavouritesProvider } from "../context/FavouritesContext";
import { ThemeProvider } from "../context/themeContext";
import { DataProvider } from "../context/dataContext";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <FavouritesProvider>
        <DataProvider>
          <Component {...pageProps} />
        </DataProvider>
      </FavouritesProvider>
    </ThemeProvider>
  );
}

export default MyApp;
