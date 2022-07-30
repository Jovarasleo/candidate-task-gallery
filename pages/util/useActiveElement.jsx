import { useState, useEffect } from "react";
const useActiveElement = () => {
  const [active, setActive] = useState();

  const handleFocusIn = () => {
    setActive(document.activeElement);
  };

  useEffect(() => {
    const main = document.querySelector("main");
    setActive(document.activeElement);
    main.addEventListener("focusin", handleFocusIn);
    return () => {
      main.removeEventListener("focusin", handleFocusIn);
    };
  }, []);

  return active;
};
export default useActiveElement;
