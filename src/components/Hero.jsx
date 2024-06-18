import React from "react";

import "../assets/style/front.scss"
import { Link } from "react-router-dom";

export default function Hero({randomAnime}) {

  const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0;
  };

  return (
    isObjectEmpty(randomAnime) == false && (
      <section className="hero-background" style={{background:`url(${randomAnime.data.images.webp.large_image_url})`}}>
        <div className="hero-content">
        <h2 className="title-hero"> {randomAnime.data.titles[0].title}</h2>
        <p className="desc-hero">{randomAnime.data.synopsis}</p>
        <Link to={`/anime/${randomAnime.data.mal_id}`}><button className="btn_explore_now">Explore Now</button></Link>
        </div>
      </section>
    )
  );
}
