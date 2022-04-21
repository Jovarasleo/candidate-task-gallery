import styles from "./index.module.css";
import { useContext } from "react";
import FavouritesContext from "../../../context/FavouritesContext";
import { FaHeart } from "react-icons/fa";

function ImageCard({ style, className, onClick, image }) {
  const orientationClass =
    image?.height >= image?.width ? styles.portrait : styles.landscape;
  const newClass = styles.imageWrapper.concat(" ", orientationClass);

  const { favourites, toggleFavourite } = useContext(FavouritesContext);
  const handleClick = (e) => {
    console.log(image);
    toggleFavourite(image);
    e.stopPropagation();
  };
  const isFavourite = favourites.some((item) => item.id === image?.id);
  const url = image?.urls?.small;
  return (
    <>
      <div
        className={newClass.concat(" ", className)}
        style={style}
        onClick={onClick}
      >
        {isFavourite ? (
          <button
            className={styles.favouriteButton}
            onClick={(e) => handleClick(e)}
          >
            <FaHeart />
          </button>
        ) : null}
        <img src={url} alt={image?.id} />
      </div>
    </>
  );
}
export default ImageCard;
