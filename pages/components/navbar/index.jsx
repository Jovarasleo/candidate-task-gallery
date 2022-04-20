import { useContext } from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineImage } from "react-icons/md";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { default as Logo } from "../../Logo.svg";
import ThemeContext from "../../../context/ThemeContext";
import styles from "./styles.module.css";

function Navbar({
  showFavourites,
  setShowFavourites,
  showNavbar,
  setShowNavbar,
  image,
}) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav
      className={
        theme === "light"
          ? styles.navbarLight.concat(
              " ",
              showNavbar ? styles.show : styles.hide
            )
          : styles.navbarDark.concat(
              " ",
              showNavbar ? styles.show : styles.hide
            )
      }
      style={!image ? { zIndex: 1 } : null}
    >
      <div className={styles.navWrapper}>
        <Logo className={styles.logo} />
        <div className={styles.buttonWrapper}>
          <button
            onClick={() => setShowFavourites(true)}
            className={styles.navButtons.concat(
              " ",
              showFavourites ? styles.selected : null
            )}
          >
            <FaRegHeart />
          </button>
          <button
            onClick={() => setShowFavourites(false)}
            className={styles.navButtons.concat(
              " ",
              !showFavourites ? styles.selected : null
            )}
          >
            <MdOutlineImage />
          </button>
        </div>
        <div className={styles.buttonWrapper}>
          <button className={styles.navButtons}>
            <FiMail />
          </button>
          <button
            className={styles.navButtons.concat(" ", styles.bottomButtons)}
            onClick={() => toggleTheme(theme)}
          >
            {theme === "light" ? <BsMoonFill /> : <BsSunFill />}
          </button>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
