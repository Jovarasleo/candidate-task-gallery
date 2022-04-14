import styles from "./index.module.css";

function ImageCard({ img, style, className, onClick }) {
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
