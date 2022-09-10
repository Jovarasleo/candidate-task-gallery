import { useState, useEffect } from "react";
const useFocusElement = (
  showImage: Boolean,
  showModal: Boolean,
  showFavourites: Boolean
) => {
  const [active, setActive] = useState<HTMLElement | null>(null);
  const handleFocusIn = () => {
    if (document.activeElement instanceof HTMLElement) {
      setActive(document.activeElement);
    }
  };

  useEffect(() => {
    const main = document.querySelector("main");
    handleFocusIn();
    if (main) {
      main.addEventListener("focusin", handleFocusIn);
      return () => {
        main.removeEventListener("focusin", handleFocusIn);
      };
    }
  }, []);

  useEffect(() => {
    if (active !== null) {
      active.focus();
    }
  }, [showImage, showModal, showFavourites, active]);
};
export default useFocusElement;
