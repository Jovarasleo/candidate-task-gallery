// import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ImageCard from "./components/imageCard/index";
import { useState, useEffect, useRef } from "react";
import randomPortrait from "../randomPortrait.json";
import randomLandscape from "../randomLandscape.json";
import BigImage from "./components/bigImage";

const Home = ({ data }) => {
  const [myData, setmyData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const [showImage, setShowImage] = useState(false);
  const [imgId, setImgId] = useState("");

  const openImage = (id) => {
    setShowImage(true);
    setImgId(id);
    console.log(imgId);
  };

  useEffect(() => {
    console.log("random portait:", randomPortrait);
    console.log("random landscape:", randomLandscape);
    if (showImage) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "";
  }, [showImage]);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {randomLandscape.map((image, index) => {
          if (index % 2 == 0) {
            return (
              <div className={styles.cardsWrapper} key={index}>
                <ImageCard
                  key={randomPortrait[index]?.id}
                  img={randomPortrait[index]?.urls?.thumb}
                  className={styles.seperator.concat(" ", styles.portrait)}
                  onClick={() => openImage(randomPortrait[index]?.id)}
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
                  key={randomPortrait[index]?.id}
                  img={randomPortrait[index]?.urls?.thumb}
                  className={styles.portrait}
                  onClick={() => openImage(randomPortrait[index]?.id)}
                  showImage={showImage}
                  setShowImage={setShowImage}
                />
              </div>
            );
          }
        })}
      </main>
      {showImage ? (
        <BigImage image={imgId} onClick={() => setShowImage(false)} />
      ) : null}
      <footer className={styles.footer}></footer>
    </div>
  );
};
export default Home;
