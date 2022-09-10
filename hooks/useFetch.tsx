import { useState } from "react";
const useFetch = (url: string) => {
  const [images, setData] = useState<Array<Object>>([]);
  const [image, setImage] = useState();
  const [error, setError] = useState(null);
  const [requestCount, setRequestCount] = useState(0);

  const fetchData = async (id: string) => {
    try {
      setRequestCount(requestCount + 1);
      const response = id
        ? await fetch(id)
        : await fetch(`${url}?count=${requestCount}`);
      const data = await response.json();
      if (data.success) {
        if (id) {
          console.log(data?.image?.response);
          setImage(data?.image?.response);
        } else setData([...images, ...data.images]);
        setError(null);
      } else {
        setError(data.error);
      }
    } catch (ex: any) {
      setError(ex);
    }
  };

  return [{ images, image, error }, fetchData];
};

export default useFetch;
