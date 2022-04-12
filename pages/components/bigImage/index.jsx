import styles from "./index.module.css";
import { useEffect, useState } from "react";
function BigImage({ image, onClick }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(`api/fetchSingleImage?id=${image}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
    console.log(data);
  }, []);
  return (
    <div className={styles.imageBackdrop} onClick={onClick}>
      <div className={styles.bigImageWrapper}>
        <img src={data?.urls?.regular} alt="" />
        <div>INFO</div>
      </div>
    </div>
  );
}
export default BigImage;
