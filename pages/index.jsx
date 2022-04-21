import React, { Suspense } from "react";
import styles from "../styles/Home.module.css";
import ImageCard from "./components/imageCard/index";
import { useState, useEffect, useCallback, useContext, useRef } from "react";
import useMediaQuery from "./util/useMediaQuery";
import FavouritesContext from "../context/FavouritesContext";
import Navbar from "./components/navbar";
import NewsLetterModal from "./components/newsLetterModal";
import useIsMobile from "./util/useIsMobile";
import ThemeContext from "../context/ThemeContext";
import DataContext from "../context/DataContext";
import { useSwipeable } from "react-swipeable";
import Head from "next/head";
const OpenImage = React.lazy(() => import("./components/openImage"));

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const {
    portraitImages,
    setPortraitImages,
    landscapeImages,
    setLandscapeImages,
    error,
    setError,
  } = useContext(DataContext);
  const { favourites } = useContext(FavouritesContext);

  const [showNavbar, setShowNavbar] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [showFavourites, setShowFavourites] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");
  const isIE = useRef(false);

  const observer = useRef();
  const wait = useRef(false);
  const isMobile = useIsMobile();

  const isBreakpoint = useMediaQuery(768);

  useEffect(() => {
    const data = /*@cc_on!@*/ false || !!document.documentMode;
    isIE.current = data;
    if (!isIE) {
      if (navigator.userAgent.indexOf("MSIE") > 0) {
        isIE.current = true;
      } else {
        isIE.current = false;
      }
    }
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => setShowNavbar(false),
    onSwipedRight: () => setShowNavbar(true),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const openImage = (id) => {
    setShowImage(!showImage);
    setImage(id);
  };
  useEffect(() => {
    if (isBreakpoint) {
      setShowNavbar(false);
    } else setShowNavbar(true);
  }, [isBreakpoint, setShowNavbar]);

  const getPhotos = useCallback(async () => {
    try {
      const response = await fetch("api/getPhotos");
      const data = await response.json();
      if (data.success) {
        setLandscapeImages([...landscapeImages, ...data.images.landscape]);
        setPortraitImages([...portraitImages, ...data.images.portrait]);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(error);
    }
  }, [
    landscapeImages,
    portraitImages,
    setPortraitImages,
    setLandscapeImages,
    setError,
  ]);

  const handleScroll = useCallback(() => {
    if (
      document.body.scrollTop + window.innerHeight >=
        document.body.scrollHeight &&
      !wait.current
    ) {
      wait.current = true;
      if (wait.current) {
        setLoading(true);
      }
      setTimeout(function () {
        wait.current = false;
      }, 1000);
    }
  }, []);

  const lastItemRef = useCallback(
    (node) => {
      if (!isIE.current) {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            setLoading(true);
          }
        });
        if (node) observer.current.observe(node);
      }
      if (isIE.current) {
        console.log("IE found");
        window.addEventListener("scroll", handleScroll, true);
        return () => window.addEventListener("scroll", handleScroll, true);
      }
    },
    [handleScroll]
  );

  useEffect(() => {
    if (isLoading) {
      setLoading(false);
      getPhotos();
    }
    if (showImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showImage, getPhotos, isLoading]);

  return (
    <div
      id="app"
      className={theme === "light" ? styles.applight : styles.appdark}
      {...(isBreakpoint ? handlers : {})}
      style={{ touchAction: "pan-y" }}
    >
      <Head>
        <title>My page title</title>
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      <div
        className={styles.container.concat(
          " ",
          theme === "light" ? styles.containerLight : styles.containerDark
        )}
      >
        <Navbar
          showFavourites={showFavourites}
          setShowFavourites={setShowFavourites}
          setShowModal={setShowModal}
          showModal={showModal}
          showNavbar={showNavbar}
          image={image}
        />
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
                  const isLastElement = portraitImages.length === index + 1;
                  if (index % 2 == 0) {
                    return (
                      <div
                        className={styles.cardsWrapper}
                        key={image.id + portraitImages[index]?.id + index}
                        ref={isLastElement ? lastItemRef : null}
                      >
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
                      <div
                        className={styles.cardsWrapper}
                        key={image.id + portraitImages[index]?.id + index}
                        ref={isLastElement ? lastItemRef : null}
                      >
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
        </main>
        <Suspense fallback={<div>Loading...</div>}>
          {showImage ? (
            <OpenImage
              image={image}
              onClick={() => openImage()}
              portraitImages={portraitImages}
              landscapeImages={landscapeImages}
            />
          ) : null}
        </Suspense>
        {showModal ? (
          <NewsLetterModal onClick={() => setShowModal(!showModal)} />
        ) : null}
      </div>
    </div>
  );
};
export default Home;
