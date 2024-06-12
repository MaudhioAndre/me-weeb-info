import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";

import axios from "axios";
import { API_URL } from "../api/jikanApi";

export default function ListAnimeAll() {
  const [animeList, setAnimeList] = useState([]);
  console.log(animeList);

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength - 3) + "...";
    }
    return title;
  };

  useEffect(() => {
    const getData = () => {
      console.log("getData");
      axios
        .get(`${API_URL}/top/anime`)
        .then((response) => {
          console.log(response);
          setAnimeList(response.data.data);
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
        <title>
          MeWeeb | Anime List 
        </title>
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
      <center>
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
      </section>
    </>
  );
}
