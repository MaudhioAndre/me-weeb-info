import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";

import axios from "axios";
import { API_URL } from "../api/jikanApi";
import TruncateTitle from "../components/TruncateTitle";
import LoadingComp from "../components/LoadingComp";

export default function ListAnimeAll() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(animeList);

  useEffect(() => {
    const getData = () => {
      console.log("getData");
      axios
        .get(`${API_URL}/top/anime`)
        .then((response) => {
          console.log(response);
          setAnimeList(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getData();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MeWeeb | Anime List</title>
        <meta name="robots" content="index,follow" />
        <meta
          name="keywords"
          content="Anime, Anime Info, Anime Wiki, Anime Recommendation, Anime Clubs Tips, Anime Information, Manga, Anime Reviews, Anime News"
        />
        <meta
          name="description"
          content="This webpage provides a list of anime recommendations or a collection of your favorite anime shows."
        />
      </Helmet>

      {loading ? (
        <LoadingComp />
      ) : (
        <div>
          <h1 className="my-8 text-3xl font-bold text-center text-white">
            All Anime
          </h1>
          <div className="grid grid-cols-1 gap-8 px-5 pt-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {animeList &&
              animeList.map((anime, index) => (
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
                      <span className="text-red-500">
                        {`${index < 9 ? "0" : ""}${index + 1}`}
                      </span>
                      {` ${TruncateTitle(anime.title, 14)}`}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

{
  /* <center>
        <h2>
          <b>All Anime</b>
        </h2>
      </center>
      <br />
      <br />
      <section className="div_content">
        {animeList &&
          animeList.map((data, i) => (
            <Link to={`/anime/${data.mal_id}`}>
              <article
                className="img_content"
                style={{ backgroundImage: `url(${data.images.jpg.image_url})` }}
              >
                <h6>
                  <span>{i + 1} </span>
                  {data.title}
                </h6>
              </article>
            </Link>
          ))}
      </section> */
}
