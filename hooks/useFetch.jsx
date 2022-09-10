import { useState, useRef } from "react";
const useFetch = (url) => {
  const [images, setData] = useState([]);
  const [image, setImage] = useState();
  const [error, setError] = useState(null);
  const [requestCount, setRequestCount] = useState(0);
  console.log(`${url}/?${requestCount}`);
  const fetchData = async (id) => {
    try {
      setRequestCount(requestCount + 1);
      const response = id
        ? await fetch(id)
        : await fetch(`${url}?count=${requestCount}`);
      const data = await response.json();
      if (data.success) {
        if (id) {
          setImage(data?.image?.response);
        } else setData([...images, ...data.images]);
        setError(null);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError(error);
    }
  };
  return [{ images, image, error }, fetchData];
};
export default useFetch;
