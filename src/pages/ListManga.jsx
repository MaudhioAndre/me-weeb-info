import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { API_URL } from "../api/jikanApi";

export default function ListManga() {
  const [mangaList, setMangaList] = useState([]);
  console.log(mangaList);

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
        .get(`${API_URL}/top/manga`)
        .then((response) => {
          console.log(response);
          const data = response.data.data;
          console.log(data);
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
        <div>Top Manga</div>
        <Link to={"all/manga"}>View More</Link>
      </div>
      <div className="div_content">
        {mangaList &&
          mangaList.map((data, i) => (
            <Link to={`/manga/${data.mal_id}`}>
              <div className="img_content" style={{backgroundImage:`url(${data.images.jpg.image_url})`}}>
                <div>
                  <span>{i + 1} </span>
                  {data.title}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}
