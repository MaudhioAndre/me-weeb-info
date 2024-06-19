import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";
import LoadingComp from "../components/LoadingComp";
import TruncateTitle from "../components/TruncateTitle";

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          "https://api.jikan.moe/v4/recommendations/anime"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setRecommendations(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return <LoadingComp />;
  }


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MeWeeb | Anime & Manga Recommendations</title>
        <meta name="robots" content="index,follow" />
        <meta
          name="keywords"
          content="Anime, Manga, Anime Recommendations, Anime Information, Manga Information"
        />
        <meta
          name="description"
          content="Looking for your next anime or manga obsession? We've got you covered! From pulse-pounding action and epic adventures to slice-of-life stories and tear-jerking dramas, discover a vast library of recommendations tailored to every taste."
        />
      </Helmet>

      <h1 className="my-8 text-3xl font-bold text-center text-white">
        Anime & Manga Recommendations
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {recommendations &&
          recommendations.map((recommendation) => (
            <section className="py-16 bg-transparent">
              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-center mb-8">
                  <h2 className="text-base font-bold text-white underline decoration-blue-400 underline-offset-4">
                    Recommended by{" "}
                    <a
                      href={recommendation.user.url}
                      className="text-blue-500 hover:underline"
                    >
                      {recommendation.user.username}
                    </a>{" "}
                    on {new Date(recommendation.date).toLocaleDateString()}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                  {recommendation.entry.map((anime) => (
                    <Link
                      to={`/anime/${anime.mal_id}`}
                      key={anime.mal_id}
                      className="relative overflow-hidden bg-transparent rounded-lg shadow-md"
                    >
                      <img
                        src={anime.images.jpg.image_url}
                        alt={anime.title}
                        className="object-cover object-center w-full lg:h-64 h-96"
                      />
                      <div className="absolute bottom-0 left-0 right-0 py-2 text-center text-white bg-black bg-opacity-80">
                        <h3 className="text-base font-semibold">
                          <span className="text-red-500">{anime.mal_id}</span>
                          {` ${TruncateTitle(anime.title, 14)}`}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ))}
      </div>
    </>
  );
}

{
  /* <center>
        <h2>
          <b>Anime & Manga Recommendations</b>
        </h2>
      </center>
      <br />
      <br />
      <br />
      <section className="div_contain_anime_rec">
        {recommendations &&
          recommendations.map((recommendation) => (
            <article>
              Recommended by &nbsp;
              <a href={recommendation.user.url}>
                {recommendation.user.username}
              </a>
              &nbsp; on {new Date(recommendation.date).toLocaleDateString()}
              <figure className="div_anime_recommendations">
                {recommendation.entry.map((anime) => (
                  <Link
                    to={`/anime/${anime.mal_id}`}
                    key={anime.mal_id}
                    className="card_anime_recommend"
                  >
                    <div
                      className="img_content"
                      style={{
                        backgroundImage: `url(${anime.images.jpg.image_url})`,
                      }}
                    >
                      <h6>{` ${truncateTitle(anime.title, 14)}`}</h6>
                    </div>
                  </Link>
                ))}
              </figure>
            </article>
          ))}
      </section> */
}
