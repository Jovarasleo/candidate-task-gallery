import { useContext } from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineImage } from "react-icons/md";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { default as Logo } from "../../Logo.svg";
import useSelectTheme from "../../../hooks/useSelectTheme";
import clsx from "clsx";
import Button from "../button";
import styles from "./styles.module.css";

interface NavbarPros {
  showFavourites: boolean;
  setShowFavourites: (showFavourites: boolean) => void;
  showNavbar: boolean;
  setShowModal: (showModal: any) => void;
  showModal: boolean;
  image: boolean;
}

function Navbar({
  showFavourites,
  setShowFavourites,
  showNavbar,
  setShowModal,
  image,
}: NavbarPros) {
  const { theme, toggleTheme } = useSelectTheme();

  return (
    <nav
      className={clsx(showNavbar ? styles.show : styles.hide, styles.navbar)}
      style={!image ? { zIndex: 1 } : {}}
    >
      <div className={styles.navWrapper}>
        <Logo className={styles.logo} />
        <div className={styles.buttonWrapper}>
          <Button
            navButton
            onClick={() => setShowFavourites(true)}
            selected={showFavourites}
          >
            <FaRegHeart />
          </Button>
          <Button
            navButton
            onClick={() => setShowFavourites(false)}
            selected={!showFavourites}
          >
            <MdOutlineImage />
          </Button>
        </div>
        <div className={clsx(styles.buttonWrapper, styles.bottomButtons)}>
          <Button
            navButton
            onClick={() =>
              setShowModal((previousState: boolean) => !previousState)
            }
          >
            <FiMail />
          </Button>
          <Button navButton onClick={() => toggleTheme()}>
            {theme === "light" ? <BsMoonFill /> : <BsSunFill />}
          </Button>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
