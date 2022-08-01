import React, { Suspense } from "react";
import styles from "./index.module.css";
import ImageCard from "./components/imageCard/index";
import { useState, useEffect, useCallback, useContext, useRef } from "react";
import useMediaQuery from "./util/useMediaQuery";
import FavouritesContext from "../context/FavouritesContext";
import Navbar from "./components/navbar";
import useIsIE from "./util/useIsIE";
import useActiveElement from "./util/useActiveElement";
import ThemeContext from "../context/ThemeContext";
import { useSwipeable } from "react-swipeable";
import Spinner from "./components/spiner";
import Head from "next/head";
import useFetch from "../hooks/useFetch";

const OpenImage = React.lazy(() => import("./components/openImageModal"));
const NewsLetterModal = React.lazy(() =>
  import("./components/newsLetterModal")
);
const Home = () => {
  const { theme } = useContext(ThemeContext);
  const { favourites } = useContext(FavouritesContext);

  const [showNavbar, setShowNavbar] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [showFavourites, setShowFavourites] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");

  const [{ images, error }, fetchData] = useFetch("api/getImages");
  const isIE = useIsIE();
  const observer = useRef();
  const wait = useRef(false);
  const focusedElement = useActiveElement();
  const isBreakpoint = useMediaQuery(768);

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
      if (!isIE) {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            setLoading(true);
          }
        });
        if (node) observer.current.observe(node);
      }
      if (isIE) {
        window.addEventListener("scroll", handleScroll, true);
        return () => window.addEventListener("scroll", handleScroll, true);
      }
    },
    [handleScroll, isIE]
  );

  useEffect(() => {
    if (isLoading) {
      fetchData();
      setLoading(false);
    }
  }, [isLoading, fetchData]);

  useEffect(() => {
    if (showImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showImage, isLoading]);

  useEffect(() => {
    if (focusedElement) {
      focusedElement.focus();
    }
  }, [focusedElement, showImage, showModal, showFavourites]);

  return (
    <div
      id="app"
      className={theme === "light" ? styles.applight : styles.appdark}
      {...(isBreakpoint ? handlers : {})}
      style={{ touchAction: "pan-y" }}
    >
      <Head>
        <title>Gallery</title>
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
                        showModal={showModal}
                        setShowImage={setShowImage}
                      />
                    </div>
                  );
                })
              : images.map((card, index) => {
                  const isLastElement = images.length === index + 1;
                  return (
                    <div
                      className={styles.cardsWrapper}
                      key={index}
                      ref={isLastElement ? lastItemRef : null}
                    >
                      {card.map((image, i) => {
                        return (
                          <ImageCard
                            image={image}
                            key={image?.id}
                            img={image?.urls?.thumb}
                            className={i === 0 ? styles.seperator : ""}
                            onClick={() => openImage(image)}
                            showImage={showImage}
                            showModal={showModal}
                            setShowImage={setShowImage}
                          />
                        );
                      })}
                    </div>
                  );
                })}
            {error ? <h3 className={styles.errorMsg}>{error}</h3> : null}
          </div>
        </main>
        <Suspense fallback={<Spinner />}>
          {showImage ? (
            <OpenImage image={image} onClick={() => openImage()} />
          ) : null}
        </Suspense>
        <Suspense fallback={<Spinner />}>
          {showModal ? (
            <NewsLetterModal onClick={() => setShowModal(!showModal)} />
          ) : null}
        </Suspense>
      </div>
    </div>
  );
};
export default Home;
