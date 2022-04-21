import styles from "./index.module.css";
function Button({ children, closeButton, onClick, className, ...rest }) {
  const btn = closeButton ? styles.closeButton : styles.btn;
  return (
    <button className={btn.concat(" ", className)} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
export default Button;
