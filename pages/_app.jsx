import { FavouritesProvider } from "../context/FavouritesContext";
import { ThemeProvider } from "../context/ThemeContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <FavouritesProvider>
        <Component {...pageProps} />
      </FavouritesProvider>
    </ThemeProvider>
  );
}

export default MyApp;
