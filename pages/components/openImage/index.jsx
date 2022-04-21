import styles from "./index.module.css";
import { useContext, useEffect, useState } from "react";
import FavouritesContext from "../../../context/FavouritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import Button from "../button";
function OpenImage({ image, onClick }) {
  const { favourites, toggleFavourite } = useContext(FavouritesContext);
  const isFavourite = favourites.some((item) => item.id === image?.id);
  const [viewHeight, setViewHeight] = useState();
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
  useEffect(() => {
    setViewHeight(window.innerHeight);
  }, [viewHeight]);
  const url = image?.urls?.regular;
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
          <img src={url} alt="" />
        </div>
        <div className={styles.infoWrapper}>
          <Button onClick={onClick} closeButton></Button>
          <div className={styles.infoWrapper__inner}>
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
            {image?.description ? (
              <div className={styles.infoDescription}>
                <p className={styles.sectionName}>Description</p>
                <p>{image?.description}</p>
              </div>
            ) : null}

            <div className={styles.infoStatistics}>
              <p>
                <FaHeart /> {image?.likes}
              </p>
              <p>
                <button
                  onClick={() => downloadImage(image?.urls.full)}
                  className={styles.downloadButton}
                >
                  <MdDownload />
                </button>
                {image?.downloads}
              </p>
              <p>
                <IoEye /> {image?.views.toLocaleString()}
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
export default OpenImage;
