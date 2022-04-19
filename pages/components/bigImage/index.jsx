import styles from "./index.module.css";
import { useContext } from "react";
import FavouritesContext from "../../../context/FavouritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import Link from "next/link";
function BigImage({ image, onClick }) {
  const { favourites, toggleFavourite } = useContext(FavouritesContext);
  const isFavourite = favourites.some((item) => item.id === image?.id);

  const downloadImage = async (data) => {
    const image = await fetch(data);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = data?.id;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(imageURL);
    link.remove();
  };
  function goToImage(id) {
    document.location.href = id;
  }
  return (
    <div className={styles.imageBackdrop} onClick={onClick}>
      <div
        className={styles.bigImageWrapper}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={styles.imageWrapper}
          onDoubleClick={() => goToImage(image?.urls?.full)}
        >
          <img src={image?.urls?.regular} alt="" />
        </div>
        <div className={styles.infoWrapper}>
          <button className={styles.closeButton} onClick={onClick}></button>
          <div className={styles.info}>
            <div className={styles.infoAuthor}>
              <div className={styles.infoAuthor__inner}>
                <p className={styles.sectionName}>author</p>
                <p className={styles.innerName}>{image?.user?.name}</p>
              </div>

              <button
                className={styles.favouriteButton}
                onClick={() => toggleFavourite(image)}
              >
                {isFavourite ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
            <div className={styles.infoDescription}>
              <p className={styles.sectionName}>Description</p>
              <p>{image?.description}</p>
            </div>
            <div className={styles.infoStatistics}>
              <p>
                {image?.likes} <FaHeart />
              </p>
              <p>
                {image?.downloads}
                <button onClick={() => downloadImage(image?.urls.full)}>
                  <MdDownload />
                </button>
              </p>
              <p>
                {image?.views} <IoEye />
              </p>
            </div>
            <div className={styles.infoCamera}>
              {image?.exif?.make && (
                <div>
                  <p className={styles.sectionName}>Camera Make</p>
                  <p>{image?.exif?.make}</p>
                </div>
              )}
              {image?.exif?.model && (
                <div>
                  <p className={styles.sectionName}>Camera Model</p>
                  <p>{image?.exif?.model}</p>
                </div>
              )}
              {image?.exif?.focal_length && (
                <div>
                  <p className={styles.sectionName}>Focal Length</p>
                  <p>{image?.exif?.focal_length}</p>
                </div>
              )}

              <div>
                <p className={styles.sectionName}>Dimensions</p>
                <p>{`${image?.height} x ${image?.width}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BigImage;
