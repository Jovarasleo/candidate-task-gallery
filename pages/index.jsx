// import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ImageCard from "./components/imageCard/index";
import { useState, useEffect, useCallback, useContext, useRef } from "react";
import randomPortrait from "../randomPortrait.json";
import randomLandscape from "../randomLandscape.json";
import BigImage from "./components/bigImage";
import FavouritesContext from "../context/FavouritesContext";
// import DetectIE from "./utils/detectIE";

const Home = () => {
  const allowFetch = useRef(false);
  const isIE = useRef(false);
  useEffect(() => {
    const data = /*@cc_on!@*/ false || !!document.documentMode;
    isIE.current = data;
    if (!isIE) {
      // Fallback to UserAgent detection for IE
      if (navigator.userAgent.indexOf("MSIE") > 0) {
        isIE.current = true;
      } else {
        isIE.current = false;
      }
    }
  }, []);

  const [portraitImages, setPortraitImages] = useState([]);
  const [landscapeImages, setLandscapeImages] = useState([]);

  const { favourites } = useContext(FavouritesContext);

  const [isLoading, setLoading] = useState(true);
  const [showFavourites, setShowFavourites] = useState(false);
  const [error, setError] = useState(false);

  const allowLoading = useRef(true);

  const [isTesting, setIsTesting] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState("");
  const buttonRef = useRef();

  const openImage = (id) => {
    setShowImage(true);
    setImage(id);
    console.log(id);
  };

  useEffect(() => {
    if (!isIE.current) {
      const observer = new IntersectionObserver((entry) => {
        if (
          entry[0].isIntersecting &&
          allowLoading.current &&
          allowFetch.current
        ) {
          console.log(entry);
          setLoading(true);
          // allowFetch.current = true;
        }
      });
      observer.observe(buttonRef.current);
    }
    if (isIE) {
      if (window) {
        window.addEventListener("scroll", throttle(handleScroll, 50), true);
        return () =>
          window.addEventListener("scroll", throttle(handleScroll, 50), true);
      }
    }
  }, [isIE]);

  const getPhotos = useCallback(async () => {
    setLoading(false);
    try {
      const response = await fetch("api/getPhotos");
      const data = await response.json();
      if (data) {
        setLandscapeImages([...landscapeImages, ...data.images.landscape]);
        setPortraitImages([...portraitImages, ...data.images.portrait]);
      } else {
        setError(true);
        allowFetch.current = false;
      }
      console.log("usecallback fetches", data);
    } catch (error) {
      setError(error);
      allowFetch.current = false;
    } finally {
      setLoading(false);
      allowFetch.current = true;
    }
  }, [landscapeImages, portraitImages]);

  function throttle(callback, limit) {
    var wait = false;
    return function (...args) {
      if (!wait) {
        callback(...args);
        wait = true;
        setTimeout(function () {
          wait = false;
        }, limit);
      }
    };
  }
  const handleScroll = (e) => {
    console.log(e);
    if (
      window.innerHeight + e?.target?.documentElement.scrollTop + 20 >=
      e?.target?.documentElement.scrollHeight
    ) {
      console.log("bottom");
      setLoading(true);
    }
  };

  const handleFavouritesOn = () => {
    setShowFavourites(true);
    allowLoading.current = false;
  };

  const handleFavouritesOff = () => {
    setShowFavourites(false);
    allowLoading.current = true;
  };

  useEffect(() => {
    if (isLoading) {
      getPhotos();
    }
    if (showImage) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "";
  }, [showImage, getPhotos, handleScroll, isLoading]);

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.navWrapper}>
          <button onClick={handleFavouritesOn}>Fav</button>
          <button onClick={handleFavouritesOff}>Random</button>
        </div>
      </nav>
      <main className={styles.main}>
        <div className={styles.gallery}>
          {showFavourites
            ? favourites?.map((image) => {
                return (
                  <div className={styles.cardsWrapper} key={image?.id}>
                    <ImageCard
                      image={image}
                      key={image?.id}
                      img={image?.urls?.thumb}
                      onClick={() => openImage(image)}
                      showImage={showImage}
                      setShowImage={setShowImage}
                    />
                  </div>
                );
              })
            : landscapeImages?.map((image, index) => {
                if (index % 2 == 0) {
                  return (
                    <div className={styles.cardsWrapper} key={index}>
                      <ImageCard
                        image={portraitImages[index]}
                        key={portraitImages[index]?.id}
                        img={portraitImages[index]?.urls?.thumb}
                        className={styles.seperator}
                        onClick={() => openImage(portraitImages[index])}
                        showImage={showImage}
                        setShowImage={setShowImage}
                      />
                      <ImageCard
                        image={image}
                        key={image?.id}
                        img={image?.urls?.thumb}
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
                        className={styles.seperator}
                        onClick={() => openImage(image)}
                        showImage={showImage}
                        setShowImage={setShowImage}
                      />
                      <ImageCard
                        image={portraitImages[index]}
                        key={portraitImages[index]?.id}
                        img={portraitImages[index]?.urls?.thumb}
                        onClick={() => openImage(portraitImages[index])}
                        showImage={showImage}
                        setShowImage={setShowImage}
                      />
                    </div>
                  );
                }
              })}
        </div>
        <div ref={buttonRef}>hey</div>
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
