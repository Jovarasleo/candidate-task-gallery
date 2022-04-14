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

  const [isLoading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [isTesting, setIsTesting] = useState(true);

  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState("");

  const openImage = (id) => {
    setShowImage(true);
    setImage(id);
    console.log(id);
  };
  const testing = () => {
    if (isTesting) {
      setPortraitImages([...portraitImages, ...randomPortrait]);
      setLandscapeImages([...landscapeImages, ...randomLandscape]);
      setLoading(false);
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
    } catch (error) {
      setError(error);
    }

    const response2 = await fetch("api/fetchPortraitImages");
    console.log("usecallback fetches portrait");
    try {
      const data = await response2.json();
      setPortraitImages([...portraitImages, ...data]);
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
      testing();
    }
    if (window) {
      window.addEventListener("scroll", handleScroll, true);
    }
    if (showImage) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "";
  }, [showImage, isLoading]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {landscapeImages?.map((image, index) => {
          if (index % 2 == 0) {
            return (
              <div className={styles.cardsWrapper} key={index}>
                <ImageCard
                  image={portraitImages[index]}
                  key={portraitImages[index]?.id}
                  img={portraitImages[index]?.urls?.thumb}
                  className={styles.seperator.concat(" ", styles.portrait)}
                  onClick={() => openImage(portraitImages[index])}
                  showImage={showImage}
                  setShowImage={setShowImage}
                />
                <ImageCard
                  image={image}
                  key={image?.id}
                  img={image?.urls?.thumb}
                  className={styles.landscape}
                  onClick={() => openImage(image)}
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
                  image={image}
                  key={image?.id}
                  img={image?.urls?.thumb}
                  className={styles.seperator.concat(" ", styles.landscape)}
                  onClick={() => openImage(image)}
                  showImage={showImage}
                  setShowImage={setShowImage}
                />
                <ImageCard
                  image={portraitImages[index]}
                  key={portraitImages[index]?.id}
                  img={portraitImages[index]?.urls?.thumb}
                  className={styles.portrait}
                  onClick={() => openImage(portraitImages[index])}
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
          image={image}
          onClick={() => setShowImage(false)}
          portraitImages={portraitImages}
          landscapeImages={landscapeImages}
        />
      ) : null}
      <footer className={styles.footer}></footer>
    </div>
  );
};
export default Home;
