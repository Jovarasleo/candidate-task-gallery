import Button from "../button";
import styles from "./index.module.css";

function NewsLetterModal({ onClick }) {
  return (
    <div className={styles.backdrop} onClick={onClick}>
      <form className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <Button closeButton onClick={onClick} type="button" />
        <h4>Subscribe to our news letter</h4>
        <div className={styles.inputWrapper}>
          <label htmlFor="name">Your name</label>
          <input name="name" type="text" className={styles.input} required />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="email">Your email address</label>
          <input name="email" type="email" required className={styles.input} />
        </div>

        <button className={styles.subscribeButton} type="submit">
          subscribe
        </button>
      </form>
    </div>
  );
}
export default NewsLetterModal;
