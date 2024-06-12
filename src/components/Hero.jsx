import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../api/jikanApi";

import "../assets/style/front.scss"

export default function Hero() {
  const [randomAnime, setRandomAnime] = useState({});

  console.log(randomAnime);

  useEffect(() => {
    const getData = async () => {
      console.log("getData");
      await axios
        .get(`${API_URL}/random/anime`)
        .then((response) => {
          console.log(response);
          setRandomAnime(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getData();
  }, []);

  const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0;
  };

  return (
    isObjectEmpty(randomAnime) == false && (
      <section className="hero-background" style={{background:`url(${randomAnime.data.images.jpg.large_image_url})`}}>
        <div className="hero-content">
        <h2 className="title-hero"> {randomAnime.data.titles[0].title}</h2>
        <p className="desc-hero">{randomAnime.data.synopsis}</p>
        {/* <button>Explore Now</button> */}
        </div>
      </section>
    )
  );
}
