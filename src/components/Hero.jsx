import React from "react";

import "../assets/style/front.scss";
import { Link } from "react-router-dom";

export default function Hero({ randomAnime }) {
  const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0;
  };

  return (
    isObjectEmpty(randomAnime) == false && (
      <section
        className="relative h-screen overflow-hidden bg-top bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${randomAnime.data.images.webp.large_image_url})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
        <div className="relative flex flex-col items-center justify-center h-full p-8 bg-black/25 md:p-12 lg:px-16 lg:py-24 md:flex-row md:items-start md:justify-start">
          <div className="max-w-lg text-center md:text-start">
            <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
              {randomAnime.data.titles[0].title}
            </h2>
            <p className="hidden max-w-lg text-white/80 md:mt-6 md:block md:text-lg md:leading-relaxed">
              {randomAnime.data.synopsis}
            </p>
            <div className="mt-4 sm:mt-8">
              <button
                className="bg-gradient-to-r hover:scale-105 rounded-full from-red-500 to-blue-500 text-white font-semibold p-0.5"
                // onClick={handleClick}
              >
                <Link to={`/anime/${randomAnime.data.mal_id}`}>
                  <span className="flex w-full p-2 text-white bg-black rounded-full">
                    Explore Now
                  </span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  );
}

{
  /* <section className="hero-background" style={{background:`url(${randomAnime.data.images.webp.large_image_url})`}}>
        <div className="hero-content">
        <h2 className="title-hero"> {randomAnime.data.titles[0].title}</h2>
        <p className="desc-hero">{randomAnime.data.synopsis}</p>
        <Link to={`/anime/${randomAnime.data.mal_id}`}><button className="btn_explore_now">Explore Now</button></Link>
        </div>
      </section> */
}
