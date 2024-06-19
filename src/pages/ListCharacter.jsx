import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TruncateTitle from "../components/TruncateTitle";

export default function ListCharacter({ characterList }) {
  const [charList, setCharList] = useState([]);
  useEffect(() => {
    setCharList(characterList);
  }, [characterList]);

  const limitedCharList = charList.slice(0, 6);

  return (
    <>
      <section className="pb-16 bg-transparent">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white underline decoration-blue-400 underline-offset-4">
              Top Characters
            </h2>
            <Link
              to={"/all/characters"}
              className="px-4 py-2 text-xs font-medium text-white hover:text-white/80"
            >
              View More
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {limitedCharList &&
              limitedCharList.map((manga, index) => (
                <Link
                  to={`/characters/${manga.mal_id}`}
                  key={manga.mal_id}
                  className="relative overflow-hidden bg-transparent rounded-lg shadow-md"
                >
                  <img
                    src={manga.images.webp.image_url}
                    alt={manga.name}
                    className="object-cover object-center w-full lg:h-64 h-96"
                  />
                  <div className="absolute bottom-0 left-0 right-0 py-2 text-center text-white bg-black bg-opacity-80">
                    <h3 className="text-base font-semibold">
                      <span className="text-red-500">
                        {`${index < 9 ? "0" : ""}${index + 1}`}
                      </span>
                      {` ${TruncateTitle(manga.name, 14)}`}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

{
  /* <div className="header_content">
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
      </section> */
}
