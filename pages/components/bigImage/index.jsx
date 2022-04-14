import styles from "./index.module.css";
import { useEffect, useState, useContext } from "react";
import FavouritesContext from "../../../context/FavouritesContext";
let istrue;
function BigImage({ image, onClick }) {
  const { favourites, toggleFavourite } = useContext(FavouritesContext);
  const isFavourite = favourites.some((item) => item.id === image?.id);
  return (
    <div className={styles.imageBackdrop} onClick={onClick}>
      <div
        className={styles.bigImageWrapper}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={image?.urls?.regular} alt="" />
        <button
          className={styles.toLocalBtn}
          onClick={() => toggleFavourite(image)}
          style={isFavourite ? { color: "red" } : { color: "blue" }}
        >
          INFO
        </button>
      </div>
    </div>
  );
}
export default BigImage;
