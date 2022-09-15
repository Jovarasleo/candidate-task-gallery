import { useState } from "react";
const useFetch = (url: string) => {
  const [images, setData] = useState<Array<Object>>([]);
  const [image, setImage] = useState<Object>();
  const [error, setError] = useState<String | null>();
  const [requestCount, setRequestCount] = useState(0);

  const fetchData = async (id: string):Promise<void> => {
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
        data.error? setError(data.error) : setError("An Unexpected Error Occurred");
      }
    } catch (ex: any) {
      setError(ex);
    }
  };

  return [{ images, image, error }, fetchData];
};

export default useFetch;
