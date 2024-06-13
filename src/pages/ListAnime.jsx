import React from "react";
import { Link } from "react-router-dom";

export default function ListAnime({ animeList }) {
  const limitedAnimeList = animeList.slice(0, 6);

  return (
    <>
      <div className="header_content">
        <h4>Top Anime</h4>
        <Link to={"all/anime"}>View More</Link>
      </div>
      <section className="div_content">
        {limitedAnimeList &&
          limitedAnimeList.map((data, i) => (
            <Link key={i} to={`anime/${data.mal_id}`}>
              <article
                className="img_content"
                style={{
                  backgroundImage: `url(${data.images.webp.image_url})`,
                }}
              >
                <h6>
                  <span>{i + 1} </span>
                  {data.title}
                </h6>
              </article>
            </Link>
          ))}
      </section>
    </>
  );
}
