import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListCharacter({ characterList }) {
  const [charList, setCharList] = useState([]);
  useEffect(() => {
    setCharList(characterList);
  }, [characterList]);

  const limitedCharList = charList.slice(0, 6);

  return (
    <>
      <div className="header_content">
        <h4>Top Character</h4>
        <Link to={"all/characters"}>View More</Link>
      </div>
      <section className="div_content">
        {limitedCharList &&
          limitedCharList.map((data, i) => (
            <Link key={i} to={`/characters/${data.mal_id}`}>
              <article
                className="img_content"
                style={{
                  backgroundImage: `url(${data.images.webp.image_url})`,
                }}
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
