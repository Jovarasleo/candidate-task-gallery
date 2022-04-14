import styles from "./index.module.css";
import { useEffect, useState, useContext } from "react";
import FavouritesContext from "../../../context/FavouritesContext";
let istrue;
function BigImage({ image, onClick, portraitImages, landscapeImages }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { favourites, toggleFavourite } = useContext(FavouritesContext);

  // useEffect(() => {
  //   let allImages = portraitImages.concat(landscapeImages);
  //   allImages.filter((file) => {
  //     if (file?.id === image) {
  //       setData(file);
  //       istrue = file;
  //     }
  //   });
  // }, [data]);
  const isFavourite = favourites.includes(image?.id);
  return (
    <div className={styles.imageBackdrop} onClick={onClick}>
      <div
        className={styles.bigImageWrapper}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={image?.urls?.regular} alt="" />
        <button
          className={styles.toLocalBtn}
          onClick={() => toggleFavourite(image.id)}
          style={isFavourite ? { color: "red" } : { color: "blue" }}
        >
          INFO
        </button>
      </div>
    </div>
  );
}
export default BigImage;
