import styles from "./index.module.css";
import { useState, useContext } from "react";
import FavouritesContext from "../../../context/FavouritesContext";
function ImageCard({ img, style, className, onClick, image }) {
  const newClass = styles.imageWrapper.concat(" ", className);

  const { favourites, toggleFavourite } = useContext(FavouritesContext);
  const handleClick = (e) => {
    console.log(image);
    toggleFavourite(image?.id);
    e.stopPropagation();
  };
  const isFavourite = favourites.includes(image?.id);
  return (
    <>
      <div className={newClass} style={style} onClick={onClick}>
        <button
          className={styles.favouriteButton}
          onClick={(e) => handleClick(e)}
          style={
            isFavourite
              ? {
                  background: "red",
                }
              : { background: "blue" }
          }
        >
          {isFavourite ? "</3" : "<3"}
        </button>
        <img src={img} alt="" />
      </div>
    </>
  );
}
export default ImageCard;
