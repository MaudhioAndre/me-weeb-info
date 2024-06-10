import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { API_URL } from "../api/jikanApi";

export default function ListCharacter() {
  const [charList, setCharList] = useState([]);
  console.log(charList);

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
          const data = response.data.data;
          console.log(data);
          const limitedCharList = data.slice(0, 6);
          setCharList(limitedCharList);
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
        <div>Top Character</div>
        <Link to={"all/characters"}>View More</Link>
      </div>
      <div className="div_content">
        {charList &&
            charList.map((data, i) => (
            <Link to={`/characters/${data.mal_id}`}>
              <div className="img_content" style={{backgroundImage:`url(${data.images.jpg.image_url})`}}>
                <div>
                  <span>{i + 1} </span>
                  {data.name}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}
