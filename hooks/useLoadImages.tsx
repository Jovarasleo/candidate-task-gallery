import { useEffect, useState } from "react";
const useLoadImages = (
  isLoading: boolean,
  fetchData: (id: string | null) => void,
  setLoading: (isLoading: boolean) => void,
  getImage: () => void,
  openImage: (image: object) => void
) => {
  const [isSingleImage, setIsSingleImage] = useState(false);

  useEffect(() => {
    const id = window.location.href.split("id=")[1];
    if (isLoading) {
      if (id) {
        fetchData(`api/getImageById?id=${id}`);
        setIsSingleImage(true);
      }
      fetchData(null);
      setLoading(false);
    }
    if (getImage && isSingleImage) {
      openImage(getImage);
      setIsSingleImage(false);
    }
  }, [
    isSingleImage,
    openImage,
    setIsSingleImage,
    setLoading,
    fetchData,
    getImage,
    isLoading,
  ]);
};
export default useLoadImages;
