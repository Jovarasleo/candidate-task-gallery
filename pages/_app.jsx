import { FavouritesProvider } from "../context/FavouritesContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <FavouritesProvider>
      <Component {...pageProps} />
    </FavouritesProvider>
  );
}

export default MyApp;
