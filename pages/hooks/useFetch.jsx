import { useState } from "react";
const useFetch = (url) => {
  const [images, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setData([...images, ...data.images]);
        setError(null);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError(error);
    }
  };
  return [{ images, error }, fetchData];
};
export default useFetch;
