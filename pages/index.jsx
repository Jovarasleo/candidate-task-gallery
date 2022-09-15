import React, { Suspense } from "react";
import { useState, useEffect, useContext } from "react";
import { useSwipeable } from "react-swipeable";
import Head from "next/head";

import ImageCard from "../components/imageCard/index";
import Navbar from "../components/navbar";
import Spinner from "../components/spiner";

import FavouritesContext from "../context/FavouritesContext";
import useFetch from "../hooks/useFetch";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import useLoadImages from "../hooks/useLoadImages";
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
  const [showImage, setShowImage] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [image, setImage] = useState("");

  const [{ images, image: getImage, error }, fetchData] =
    useFetch("api/getImages");

  useFocusElement(showImage, showModal, showFavourites);
  const isBreakpoint = useMediaQuery(768);

  const handlers = useSwipeable({
    onSwipedLeft: () => setShowNavbar(false),
    onSwipedRight: () => setShowNavbar(true),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const openImage = (image) => {
    if (image) {
      history.replaceState({}, null, `?id=${image.id}`);
    } else
      history.replaceState({}, null, window.location.href.split("/?id")[0]);
    setShowImage(!showImage);
    setImage(image);
  };

  useEffect(() => {
    if (isBreakpoint) {
      setShowNavbar(false);
    } else setShowNavbar(true);
  }, [isBreakpoint, setShowNavbar]);

  const lastItemRef = useInfiniteScroll(setLoading);
  useLoadImages(isLoading, fetchData, setLoading, getImage, openImage);

  return (
    <div
      id="app"
      {...(isBreakpoint ? handlers : {})}
      style={{ touchAction: "pan-y" }}
    >
      <Head>
        <title>Gallery</title>
      </Head>
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
          {error && !showFavourites ? (
            <h3 className={styles.errorMsg}>{error}</h3>
          ) : null}
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
  );
};
export default Gallery;
