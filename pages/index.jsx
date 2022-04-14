// import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ImageCard from "./components/imageCard/index";
import { useState, useEffect, useCallback } from "react";
import randomPortrait from "../randomPortrait.json";
import randomLandscape from "../randomLandscape.json";
import BigImage from "./components/bigImage";

const Home = () => {
  const [portraitImages, setPortraitImages] = useState([]);
  const [landscapeImages, setLandscapeImages] = useState([]);
  const [myData, setmyData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const [allImages, setAllImages] = useState([]);

  const [error, setError] = useState("");

  const [isTesting, setIsTesting] = useState(false);

  const [showImage, setShowImage] = useState(false);
  const [imgId, setImgId] = useState("");

  const openImage = (id) => {
    setShowImage(true);
    setImgId(id);
    console.log(imgId);
  };
  const testing = () => {
    if (isTesting) {
      setPortraitImages([...portraitImages, ...randomPortrait]);
      setLandscapeImages([...landscapeImages, ...randomLandscape]);
      setAllImages([
        ...portraitImages,
        ...randomPortrait,
        ...landscapeImages,
        ...randomLandscape,
      ]);
      setLoading(false);
      console.log("pust to array");
    }
    if (!isTesting) {
      getPhotos();
    }
  };

  const getPhotos = useCallback(async () => {
    const response1 = await fetch("api/fetchLandscapeImages");
    console.log("usecallback fetches landscape");
    try {
      const data = await response1.json();
      setLandscapeImages([...landscapeImages, ...data]);
      setAllImages([...allImages, ...data]);
    } catch (error) {
      setError(error);
    }

    const response2 = await fetch("api/fetchPortraitImages");
    console.log("usecallback fetches portrait");
    try {
      const data = await response2.json();
      setPortraitImages([...portraitImages, ...data]);
      setAllImages([...allImages, ...data]);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  });

  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      console.log("bottom");
      setLoading(true);
    }
  };
  useEffect(() => {
    if (isLoading) {
      console.log("useEffect called inside loading IF", allImages);
      testing();
    }
    console.log(allImages);
    if (window) {
      window.addEventListener("scroll", handleScroll, true);
    }
    if (showImage) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "";
  }, [showImage, isLoading, allImages]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {landscapeImages?.map((image, index) => {
          if (index % 2 == 0) {
            return (
              <div className={styles.cardsWrapper} key={index}>
                <ImageCard
                  key={portraitImages[index]?.id}
                  img={portraitImages[index]?.urls?.thumb}
                  className={styles.seperator.concat(" ", styles.portrait)}
                  onClick={() => openImage(portraitImages[index]?.id)}
                  showImage={showImage}
                  setShowImage={setShowImage}
                />
                <ImageCard
                  key={image?.id}
                  img={image?.urls?.thumb}
                  className={styles.landscape}
                  onClick={() => openImage(image?.id)}
                  showImage={showImage}
                  setShowImage={setShowImage}
                />
              </div>
            );
          }
          if (index % 2 == 1) {
            return (
              <div className={styles.cardsWrapper} key={index}>
                <ImageCard
                  key={image?.id}
                  img={image?.urls?.thumb}
                  className={styles.seperator.concat(" ", styles.landscape)}
                  onClick={() => openImage(image?.id)}
                  showImage={showImage}
                  setShowImage={setShowImage}
                />
                <ImageCard
                  key={portraitImages[index]?.id}
                  img={portraitImages[index]?.urls?.thumb}
                  className={styles.portrait}
                  onClick={() => openImage(portraitImages[index]?.id)}
                  showImage={showImage}
                  setShowImage={setShowImage}
                />
              </div>
            );
          }
        })}
      </main>
      {showImage ? (
        <BigImage
          image={imgId}
          onClick={() => setShowImage(false)}
          allImages={allImages}
        />
      ) : null}
      <footer className={styles.footer}></footer>
    </div>
  );
};
export default Home;
