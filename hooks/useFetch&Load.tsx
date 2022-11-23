import { useEffect, useState } from "react";
const useFetchnLoad = (
  isLoading: boolean,
  setLoading: any,
  openImage: (image: object) => void
) => {
  const [imageArray, setImageArray] = useState<Array<Object>>([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState<String | null>();

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        return data;
      } else {
        data.error
          ? setError(data.error)
          : setError("An Unexpected Error Occurred");
      }
    } catch (ex: any) {
      setError(ex);
    }
  };

  useEffect(() => {
    const id = window.location.href.split("id=")[1];

    if (isLoading) {
      fetchData("api/getImages").then((data) => {
        if (data) setImageArray([...imageArray, ...data?.images]);
      });

      if (id) {
        fetchData(`api/getImageById?id=${id}`).then((data) => {
          if (data) openImage(data.image);
        });
      }
    }
    setLoading(false);
  }, [setLoading, isLoading, imageArray, image, openImage]);
  return { imageArray, image, error, isLoading, setImage, setLoading };
};

export default useFetchnLoad;
