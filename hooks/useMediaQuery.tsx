import { useEffect, useState } from "react";
const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    setTargetReached(media.matches);

    media.addEventListener("change", () => {
      setTargetReached(media.matches);
    });

    return () =>
      media.removeEventListener("change", () => {
        setTargetReached(media.matches);
      });
  }, [width, targetReached]);

  return targetReached;
};
export default useMediaQuery;
