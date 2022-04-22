import styles from "./index.module.css";
function Button({
  children,
  closeButton,
  favouriteButton,
  selected,
  navButton,
  onClick,
  nonClickable,
  className,
  ...rest
}) {
  const btnStyle = () => {
    if (closeButton) return styles.closeButton;
    if (favouriteButton) return styles.favouriteButton;
    if (navButton) {
      return selected
        ? styles.navButton.concat(" ", styles.selected)
        : styles.navButton;
    } else return styles.btn;
  };
  const Component = nonClickable ? "div" : "button";
  return (
    <Component
      className={className ? btnStyle().concat(" ", className) : btnStyle()}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Component>
  );
}
export default Button;
