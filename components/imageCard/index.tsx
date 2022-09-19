import { FaHeart } from "react-icons/fa";
import { useContext, useEffect } from "react";
import FavouritesContext from "../../context/FavouritesContext";

import clsx from "clsx";
import Button from "../button";
import styles from "./index.module.css";

interface imageCardProps {
  onClick: any;
  className: string;
  image: {
    height: number;
    width: number;
    urls: { small: string };
    description: string;
    id: string;
  };
  showImage: boolean;
  showModal: boolean;
  item: { id: string };
  index: number;
}

function ImageCard({
  className,
  onClick,
  image,
  showImage,
  showModal,
  index,
}: imageCardProps) {
  const { favourites } = useContext(FavouritesContext);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      onClick();
    } else return;
  };

  const isFavourite = favourites.some(
    (item: { id: string }) => item.id === image?.id
  );

  const url = image?.urls?.small;

  useEffect(() => {
    if (showImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showImage]);

  return (
    <div
      className={clsx(
        image?.height > image?.width ? styles.portrait : styles.landscape,
        styles.imageWrapper,
        className
      )}
      onClick={onClick}
      tabIndex={!showImage && !showModal ? 0 : -1}
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
