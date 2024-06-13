import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ListManga({ mangaList }) {
  const [mangaData, setMangaData] = useState([]);

  useEffect(() => {
    setMangaData(mangaList);
  }, [mangaList]);

  const limitedMangaList = mangaData.slice(0, 6);

  return (
    <>
      <div className="header_content">
        <h4>Top Manga</h4>
        <Link to={"all/manga"}>View More</Link>
      </div>
      <section className="div_content">
        {limitedMangaList &&
          limitedMangaList.map((data, i) => (
            <Link key={i} to={`/manga/${data.mal_id}`}>
              <article
                className="img_content"
                style={{
                  backgroundImage: `url(${data.images.webp.image_url})`,
                }}
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
