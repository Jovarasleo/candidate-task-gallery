import "../styles/globals.css";
import type { AppProps } from "next/app";
import Home from "./index";
import { FavouritesProvider } from "../context/FavouritesContext";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FavouritesProvider>
      {/* <Home /> */}
      <Component {...pageProps} />
    </FavouritesProvider>
  );
}

export default MyApp;
