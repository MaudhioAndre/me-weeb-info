import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        <center><h2><b>All Anime</b></h2></center>
        <br/>
        <br/>
        <div className="div_content">
            {animeList &&
            animeList.map((data, i) => (
                <Link to={`/anime/${data.mal_id}`}>
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
    
  )
}
