import { useCallback, useRef } from "react";
const useDetectLastEl = (
  isIE: boolean,
  setLoading: (isloading: boolean) => void,
  handleScroll: () => void
) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (node: HTMLElement) => {
      if (!isIE) {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            setLoading(true);
          }
        });
        if (node) observer.current.observe(node);
      }
      if (isIE) {
        window.addEventListener("scroll", handleScroll, true);
        return () => window.addEventListener("scroll", handleScroll, true);
      }
    },
    [isIE, setLoading, handleScroll]
  );
  return lastItemRef;
};
export default useDetectLastEl;
