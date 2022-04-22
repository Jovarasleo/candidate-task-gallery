import { FaHeart } from "react-icons/fa";
import { useContext } from "react";
import FavouritesContext from "../../../context/FavouritesContext";
import Button from "../button";
import styles from "./index.module.css";

function ImageCard({ style, className, onClick, image, showImage }) {
  const orientationClass =
    image?.height >= image?.width ? styles.portrait : styles.landscape;
  const newClass = styles.imageWrapper.concat(" ", orientationClass);

  const { favourites } = useContext(FavouritesContext);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onClick();
    } else return;
  };
  const isFavourite = favourites.some((item) => item.id === image?.id);
  const url = image?.urls?.small;

  return (
    <div
      className={newClass.concat(" ", className)}
      style={style}
      onClick={onClick}
      tabIndex={!showImage ? 0 : -1}
      onKeyDown={(e) => handleKeyDown(e)}
    >
      {isFavourite ? (
        <Button favouriteButton nonClickable className={styles.favBtnPosition}>
          <FaHeart />
        </Button>
      ) : null}
      <img
        src={url}
        alt={image?.description ? image?.description : image?.id}
      />
    </div>
  );
}
export default ImageCard;
