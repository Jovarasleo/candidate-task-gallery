import { createContext, useState, useEffect } from "react";

const FAVOURITES_KEY = "FAVOURITE_PHOTOS";

const FavouritesContext = createContext();

function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(FAVOURITES_KEY)) || [];
    setFavourites(data);
  }, []);

  const toggleFavourite = (photoObj) => {
    let newFavourites = null;
    if (favourites.some((item) => item.id === photoObj.id)) {
      newFavourites = favourites.filter((photo) => photoObj.id !== photo.id);
    } else {
      newFavourites = [...favourites, photoObj];
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
