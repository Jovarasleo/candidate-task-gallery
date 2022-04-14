import styles from "./index.module.css";
import { useEffect, useState, useContext } from "react";
import FavouritesContext from "../../../context/FavouritesContext";

function BigImage({ image, onClick, allImages }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { favourites, toggleFavourite } = useContext(FavouritesContext);

  useEffect(() => {
    allImages.filter((file) => {
      if (file?.id === image) {
        setData(file);
      }
    });
  }, [data]);
  const isFavourite = favourites.includes(data);
  return (
    <div className={styles.imageBackdrop} onClick={onClick}>
      <div
        className={styles.bigImageWrapper}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={data?.urls?.regular} alt="" />
        <button
          className={styles.toLocalBtn}
          onClick={() => toggleFavourite(data)}
          style={isFavourite ? { color: "red" } : { color: "blue" }}
        >
          INFO
        </button>
      </div>
    </div>
  );
}
export default BigImage;
