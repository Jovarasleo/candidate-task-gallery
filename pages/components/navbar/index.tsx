import { useContext } from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineImage } from "react-icons/md";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { default as Logo } from "../../Logo.svg";
import ThemeContext from "../../../context/ThemeContext";
import Button from "../button";
import styles from "./styles.module.css";

interface NavbarPros {
  showFavourites: boolean;
  setShowFavourites: (showFavourites: boolean) => void;
  showNavbar: boolean;
  setShowModal: (showModal: boolean) => void;
  showModal: boolean;
  image: boolean;
}

function Navbar({
  showFavourites,
  setShowFavourites,
  showNavbar,
  setShowModal,
  showModal,
  image,
}: NavbarPros) {
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
      style={!image ? { zIndex: 1 } : {}}
    >
      <div className={styles.navWrapper}>
        <Logo className={styles.logo} />
        <div className={styles.buttonWrapper}>
          <Button
            className={theme === "light" ? "" : styles.btnDarkTheme}
            navButton
            onClick={() => setShowFavourites(true)}
            selected={showFavourites}
          >
            <FaRegHeart />
          </Button>
          <Button
            className={theme === "light" ? "" : styles.btnDarkTheme}
            navButton
            onClick={() => setShowFavourites(false)}
            selected={!showFavourites}
          >
            <MdOutlineImage />
          </Button>
        </div>
        <div className={styles.buttonWrapper.concat(" ", styles.bottomButtons)}>
          <Button
            className={theme === "light" ? "" : styles.btnDarkTheme}
            navButton
            onClick={() => setShowModal(!showModal)}
          >
            <FiMail />
          </Button>
          <Button
            className={theme === "light" ? "" : styles.btnDarkTheme}
            navButton
            onClick={() => toggleTheme(theme)}
          >
            {theme === "light" ? <BsMoonFill /> : <BsSunFill />}
          </Button>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
