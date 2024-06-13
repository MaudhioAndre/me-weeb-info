import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { API_URL } from "../api/jikanApi";

export default function ListCharacter() {
  const [charList, setCharList] = useState([]);

  useEffect(() => {
    const getData = () => {
      axios
        .get(`${API_URL}/top/characters`)
        .then((response) => {
          const data = response.data.data;
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
        <h4>Top Character</h4>
        <Link to={"all/characters"}>View More</Link>
      </div>
      <section className="div_content">
        {charList &&
            charList.map((data, i) => (
            <Link key={i} to={`/characters/${data.mal_id}`}>
              <article className="img_content" style={{backgroundImage:`url(${data.images.webp.image_url})`}}>
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
