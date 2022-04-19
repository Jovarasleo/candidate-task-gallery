import { useEffect, useState, useContext } from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineImage } from "react-icons/md";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { default as Logo } from "../../Logo.svg";
import useMediaQuery from "../../util/useMediaQuery";
import ThemeContext from "../../../context/themeContext";
import styles from "./styles.module.css";

function Navbar({
  showFavourites,
  setShowFavourites,
  showNavbar,
  setShowNavbar,
}) {
  const handleFavouritesOn = () => {
    setShowFavourites(true);
  };
  const handleFavouritesOff = () => {
    setShowFavourites(false);
  };
  const handleClick = (e) => {
    e.stopPropagation();
    if (!isBreakpoint) return;
    setShowNavbar(!showNavbar);
  };
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isBreakpoint = useMediaQuery(768);

  useEffect(() => {
    console.log(isBreakpoint);
    if (isBreakpoint) {
      setShowNavbar(false);
    } else setShowNavbar(true);
  }, [isBreakpoint]);
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
      // onClick={(e) => handleClick(e)}
    >
      <div className={styles.navWrapper}>
        <Logo className={styles.logo} />
        <div className={styles.buttonWrapper}>
          <button
            onClick={handleFavouritesOn}
            className={styles.navButtons.concat(
              " ",
              showFavourites ? styles.selected : null
            )}
          >
            <FaRegHeart />
          </button>
          <button
            onClick={handleFavouritesOff}
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
            className={styles.navButtons}
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
