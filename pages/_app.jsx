import "../styles/globals.css";
import { FavouritesProvider } from "../context/FavouritesContext";
import { ThemeProvider } from "../context/ThemeContext";
import { DataProvider } from "../context/DataContext";
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
