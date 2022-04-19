import styles from "../styles/Home.module.css";
import ImageCard from "./components/imageCard/index";
import { useState, useEffect, useCallback, useContext, useRef } from "react";
import BigImage from "./components/bigImage";
import FavouritesContext from "../context/FavouritesContext";
import Navbar from "./components/navbar";
import useScreenOrientation from "./util/useScreenOrientation";
import ThemeContext from "../context/themeContext";
import { useSwipeable } from "react-swipeable";
var wait = false;

const Home = () => {
  const handlers = useSwipeable({
    onSwipedLeft: () => setShowNavbar(false),
    onSwipedRight: () => setShowNavbar(true),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
  const { theme } = useContext(ThemeContext);
  const isIE = useRef(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const orientation = useScreenOrientation("portrait");
  const reqFullscreen = () => {
    let app = document.querySelector("#app");
    return (
      app.requestFullscreen() ||
      app.webkitRequestFullScreen() ||
      app.mozRequestFullScreen()
    );
  };
  const toggleFullscreen = () => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    if (isMobile) {
      var myScreenOrientation = window.screen.orientation;
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
        if (!!window.chrome) {
          myScreenOrientation.unlock();
        }
      } else {
        reqFullscreen();
        setIsFullscreen(true);
        if (!!window.chrome) {
          myScreenOrientation.lock("portrait");
        }
      }
    } else return;
  };

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

  const [portraitImages, setPortraitImages] = useState([]);
  const [landscapeImages, setLandscapeImages] = useState([]);

  const { favourites } = useContext(FavouritesContext);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [showFavourites, setShowFavourites] = useState(false);
  const [error, setError] = useState(false);

  const [firstLoad, setFirstLoad] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState("");
  const observer = useRef();

  const openImage = (id) => {
    setShowImage(!showImage);
    setImage(id);
    console.log(id);
    toggleFullscreen();
  };

  const getPhotos = useCallback(async () => {
    setLoading(false);
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
    } finally {
      setLoading(false);
      setFirstLoad(false);
    }
  }, [landscapeImages, portraitImages]);

  useEffect(() => {
    if (isLoading) {
      getPhotos();
    }
    console.log("useEffect isLoading called");
    if (showImage) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "";
  }, [showImage, getPhotos, isLoading]);

  const handleScroll = useCallback(
    (e) => {
      if (
        window.innerHeight + e?.target?.documentElement.scrollTop >=
          e?.target?.documentElement.scrollHeight &&
        !wait
      ) {
        wait = true;
        if (wait) {
          getPhotos();
        }
        setTimeout(function () {
          wait = false;
        }, 1000);
      }
    },
    [getPhotos]
  );

  const lastItemRef = useCallback(
    (node) => {
      if (!isIE.current) {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            console.log("visible");
            getPhotos();
          }
        });
        if (node) observer.current.observe(node);
      }
      if (isIE.current) {
        if (isLoading) return;
        window.addEventListener("scroll", handleScroll, true);
        return () => window.addEventListener("scroll", handleScroll, true);
      }
    },
    [isLoading, getPhotos, handleScroll]
  );
  return (
    <div
      id="app"
      className={theme === "light" ? styles.applight : styles.appdark}
      {...handlers}
      style={{ touchAction: "pan-y" }}
    >
      <div
        className={styles.container.concat(
          " ",
          theme === "light" ? styles.containerLight : styles.containerDark
        )}
      >
        {isFullscreen ? null : (
          <Navbar
            showFavourites={showFavourites}
            setShowFavourites={setShowFavourites}
            showNavbar={showNavbar}
            setShowNavbar={setShowNavbar}
          />
        )}
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
                  if (portraitImages.length === index + 1) {
                    if (index % 2 == 0) {
                      return (
                        <div
                          className={styles.cardsWrapper}
                          key={image.id + portraitImages[index]?.id + index}
                          ref={lastItemRef}
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
                          ref={lastItemRef}
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
                  } else {
                    if (index % 2 == 0) {
                      return (
                        <div
                          className={styles.cardsWrapper}
                          key={image.id + portraitImages[index]?.id + index}
                          id={image.id + portraitImages[index]?.id + index}
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
                          id={image.id + portraitImages[index]?.id + index}
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
                  }
                })}
          </div>
        </main>
        {showImage ? (
          <BigImage
            image={image}
            onClick={() => openImage()}
            portraitImages={portraitImages}
            landscapeImages={landscapeImages}
          />
        ) : null}
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
};
export default Home;
