import { useState, useEffect } from "react";

const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState();

  const updateOrientation = (event) => {
    // setOrientation(window.screen.orientation.type);
  };

  useEffect(() => {
    // setOrientation(window.screen.orientation.type);
    // window.addEventListener("orientationchange", updateOrientation);
    // return () => {
    //   window.removeEventListener("orientationchange", updateOrientation);
    // };
  }, []);

  return orientation;
};

export default useScreenOrientation;
