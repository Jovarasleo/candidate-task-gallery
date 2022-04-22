import { useEffect, useRef } from "react";

function useIsIE() {
  const isIE = useRef(false);
  useEffect(() => {
    const data = /*@cc_on!@*/ false || !!document.documentMode;
    isIE.current = data;
    if (!isIE) {
      if (navigator.userAgent.indexOf("MSIE") > 0) {
        isIE.current = true;
      } else {
        isIE.current = false;
      }
    }
  }, []);
  return isIE.current;
}
export default useIsIE;
