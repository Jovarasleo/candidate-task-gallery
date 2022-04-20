import "../styles/globals.css";
import { FavouritesProvider } from "../context/FavouritesContext";
import { ThemeProvider } from "../context/themeContext";
import { DataProvider } from "../context/dataContext";
function MyApp({ Component, pageProps }) {
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
