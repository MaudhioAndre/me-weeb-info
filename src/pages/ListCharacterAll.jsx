import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";

import axios from "axios";
import { API_URL } from "../api/jikanApi";

export default function ListCharacterAll() {
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
        .get(`${API_URL}/top/characters`)
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
        <title>MeWeeb | Anime Character List</title>
        <meta name="robots" content="index,follow" />
        <meta
          name="keywords"
          content="Anime Character, Anime Character Info, Anime Character Wiki, Anime Character Information"
        />
        <meta
          name="description"
          content="This webpage provides a list of Anime Character recommendations or a collection of your Anime Character."
        />
      </Helmet>
      <center>
        <h2>
          <b>All Characters</b>
        </h2>
      </center>
      <br />
      <br />
      <section className="div_content">
        {animeList &&
          animeList.map((data, i) => (
            <Link to={`/characters/${data.mal_id}`}>
              <article
                className="img_content"
                style={{ backgroundImage: `url(${data.images.jpg.image_url})` }}
              >
                <h6>
                  <span>{i + 1} </span>
                  {data.name}
                </h6>
              </article>
            </Link>
          ))}
      </section>
    </>
  );
}
