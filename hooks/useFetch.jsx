import { useState } from "react";
const useFetch = (url) => {
  const [images, setData] = useState([]);
  const [image, setImage] = useState();
  const [error, setError] = useState(null);

  const fetchData = async (id) => {
    try {
      const response = id ? await fetch(id) : await fetch(url);
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
