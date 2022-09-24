import React, { Suspense } from "react";
import { useState, useEffect, useContext } from "react";
import { useSwipeable } from "react-swipeable";
import Head from "next/head";

import ImageCard from "../components/imageCard/index";
import Navbar from "../components/navbar";
import Spinner from "../components/spiner";

import FavouritesContext from "../context/FavouritesContext";
import useFetchnLoad from "../hooks/useFetch&Load";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import useFocusElement from "../hooks/useFocusElement";
import useMediaQuery from "../hooks/useMediaQuery";

import styles from "./index.module.css";

const OpenImage = React.lazy(() => import("../components/openImageModal"));
const NewsLetterModal = React.lazy(() =>
  import("../components/newsLetterModal")
);
const Gallery = () => {
  const { favourites } = useContext(FavouritesContext);

  const [showNavbar, setShowNavbar] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [showFavourites, setShowFavourites] = useState(false);
  const [showModal, setShowModal] = useState((current) => (current = false));

  const isBreakpoint = useMediaQuery(768);

  const handlers = useSwipeable({
    onSwipedLeft: () => setShowNavbar(false),
    onSwipedRight: () => setShowNavbar(true),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
  const openImage = (image) => {
    setImage(image);
    if (image) {
      history.replaceState({}, null, `?id=${image.id}`);
    } else {
      history.replaceState({}, null, window.location.href.split("/?id")[0]);
      setImage(null);
    }
  };

  const { imageArray, image, error, setImage } = useFetchnLoad(
    isLoading,
    setLoading,
    openImage
  );

  useFocusElement(image, showModal, showFavourites);
  const lastItemRef = useInfiniteScroll(setLoading);

  useEffect(() => {
    if (image) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.paddingRight = "16px";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.paddingRight = "0px";
    }
  }, [image]);

  return (
    <div
      id="app"
      {...(isBreakpoint ? handlers : {})}
      style={{ touchAction: "pan-y" }}
      className={error | showFavourites && styles.heightLimit}
    >
      <Head>
        <title>Gallery</title>
      </Head>
      <Navbar
        showFavourites={showFavourites}
        setShowFavourites={setShowFavourites}
        setShowModal={setShowModal}
        setShowNavbar={setShowNavbar}
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
                      showModal={showModal}
                    />
                  </div>
                );
              })
            : imageArray.map((card, index) => {
                const isLastElement = imageArray.length === index + 1;
                return (
                  <div
                    className={styles.cardsWrapper}
                    key={`${card[0]?.id}${card[1]?.id}`}
                    ref={isLastElement ? lastItemRef : null}
                  >
                    {card.map((image, i) => {
                      return (
                        <ImageCard
                          image={image}
                          index={index}
                          i={i}
                          key={image?.id}
                          img={image?.urls?.thumb}
                          className={i === 0 ? styles.seperator : ""}
                          onClick={() => openImage(image)}
                          showModal={showModal}
                        />
                      );
                    })}
                  </div>
                );
              })}
          {error && !showFavourites ? (
            <h3 className={styles.errorMsg}>{error}</h3>
          ) : null}
        </div>
      </main>
      <Suspense fallback={<Spinner />}>
        {image ? <OpenImage image={image} onClick={() => openImage()} /> : null}
      </Suspense>
      <Suspense fallback={<Spinner />}>
        {showModal ? (
          <NewsLetterModal onClick={() => setShowModal(!showModal)} />
        ) : null}
      </Suspense>
    </div>
  );
};
export default Gallery;
