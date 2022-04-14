import { createContext, useState, useEffect } from "react";

const FAVOURITES_KEY = "FAVOURITE_PHOTOS";

const FavouritesContext = createContext();
function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(FAVOURITES_KEY));
    if (data) {
      setFavourites(data);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
  }, [favourites]);

  console.log(favourites);
  const toggleFavourite = (id) => {
    console.log(id);
    let newFavourites = null;
    if (favourites.includes(id)) {
      newFavourites = favourites.filter((photoId) => id !== photoId);
    } else {
      newFavourites = [...favourites, id];
    }
    setFavourites(newFavourites);
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(newFavourites));
  };
  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}
export default FavouritesContext;
export { FavouritesProvider };
