import styles from "./index.module.css";
import BigImage from "../bigImage";
function ImageCard({
  img,
  style,
  className,
  onClick,
  showImage,
  setShowImage,
}) {
  const newClass = styles.imageWrapper.concat(" ", className);
  return (
    <>
      <div className={newClass} style={style} onClick={onClick}>
        <img src={img} alt="" />{" "}
      </div>
    </>
  );
}
export default ImageCard;
