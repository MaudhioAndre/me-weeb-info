import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { API_URL } from "../api/jikanApi";

export default function ListManga() {
  const [mangaList, setMangaList] = useState([]);

  useEffect(() => {
    const getData = () => {
      axios
        .get(`${API_URL}/top/manga`)
        .then((response) => {
          const data = response.data.data;
          const limitedMangaList = data.slice(0, 6);
          setMangaList(limitedMangaList);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getData();
  }, []);

  return (
    <>
      <div className="header_content">
        <h4>Top Manga</h4>
        <Link to={"all/manga"}>View More</Link>
      </div>
      <section className="div_content">
        {mangaList &&
          mangaList.map((data, i) => (
            <Link key={i} to={`/manga/${data.mal_id}`}>
              <article
                className="img_content"
                style={{ backgroundImage: `url(${data.images.webp.image_url})` }}
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
