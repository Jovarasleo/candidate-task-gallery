import { useEffect, useState } from "react";
const useFetch = (url, isLoading) => {
  const [portraitImages, setPortraitImages] = useState([]);
  const [landscapeImages, setLandscapeImages] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setLandscapeImages([...landscapeImages, ...data.images.landscape]);
        setPortraitImages([...portraitImages, ...data.images.portrait]);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    if (isLoading) {
      fetchData();
    }
  }, [isLoading, url]);
  return {
    portraitImages,
    landscapeImages,
    error,
  };
};
export default useFetch;
