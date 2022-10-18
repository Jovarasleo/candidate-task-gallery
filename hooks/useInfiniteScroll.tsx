import { useCallback, useRef } from "react";

const useInfiniteScroll = (setLoading: (isloading: boolean) => void) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setLoading(true);
        }
      });
      if (node) observer.current.observe(node);
    },
    [setLoading]
  );
  return lastItemRef;
};
export default useInfiniteScroll;
