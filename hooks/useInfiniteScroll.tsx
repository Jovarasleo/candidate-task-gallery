import { useCallback, useRef } from "react";

const useInfiniteScroll = (
  isIE: boolean,
  setLoading: (isloading: boolean) => void
) => {
  const wait = useRef(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const handleScroll = useCallback(() => {
    if (
      document.body.scrollTop + window.innerHeight >=
        document.body.scrollHeight &&
      !wait.current
    ) {
      wait.current = true;
      if (wait.current) {
        setLoading(true);
      }
      setTimeout(function () {
        wait.current = false;
      }, 1000);
    }
  }, [setLoading]);

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
export default useInfiniteScroll;
