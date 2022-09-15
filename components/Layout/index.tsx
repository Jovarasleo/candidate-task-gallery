import { useState, useEffect, useContext } from "react";

import useMediaQuery from "../../hooks/useMediaQuery";
import { useSwipeable } from "react-swipeable";
function Layout() {
  const [showNavbar, setShowNavbar] = useState(true);
  const isBreakpoint = useMediaQuery(768);
  const handlers = useSwipeable({
    onSwipedLeft: () => setShowNavbar(false),
    onSwipedRight: () => setShowNavbar(true),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
  useEffect(() => {
    if (isBreakpoint) {
      setShowNavbar(false);
    } else setShowNavbar(true);
  }, [isBreakpoint, setShowNavbar]);
  return (
    <>
      <div
        id="app"
        {...(isBreakpoint ? handlers : {})}
        style={{ touchAction: "pan-y" }}
      >
        {" "}
      </div>
      <Navbar
        showFavourites={showFavourites}
        setShowFavourites={setShowFavourites}
        setShowModal={setShowModal}
        showNavbar={showNavbar}
        image={image}
      />
    </>
  );
}
export default Layout;
