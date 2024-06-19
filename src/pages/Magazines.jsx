import React, { useEffect, useState } from "react";
import axios from "axios";

import { Helmet } from "react-helmet";
import LoadingComp from "../components/LoadingComp";

export default function Magazines() {
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(magazines);

  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        const response = await axios.get("https://api.jikan.moe/v4/magazines");
        setMagazines(response.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchMagazines();
  }, []);

  if (loading) <LoadingComp />;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MeWeeb | Magazines</title>
        <meta name="robots" content="index,follow" />
        <meta name="keywords" content="Anime, Manga, Anime & Manga Magazines" />
        <meta
          name="description"
          content="Obsessed with anime and manga? Fuel your fandom with our magazines! Packed with exclusive interviews, in-depth reviews, and eye-catching visuals, discover the latest news and trends surrounding your favorite characters and series."
        />
      </Helmet>

      <div className="min-h-screen px-6 py-12 text-white bg-black">
        <h1 className="mb-16 text-3xl font-bold text-center text-white">
          Magazines
        </h1>
        <ul className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {magazines.map((magazine) => (
            <li
              key={magazine.mal_id}
              className="transition duration-300 bg-black border border-gray-700 rounded-lg shadow-md cursor-pointer hover:shadow-lg"
            >
              <div className="p-6">
                <h2 className="mb-2 text-lg font-bold">{magazine.name}</h2>
                <a
                  href={magazine.url}
                  target="_blank"
                  className="block text-blue-500 hover:underline"
                >
                  {magazine.count}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

{
  /* <center>
        <h2>
          <b>Magazines</b>
        </h2>
      </center>
      <br />
      <br />
      <br />
      <section className="div_c_magazine">
        {magazines &&
          magazines.map((magazine) => (
            <a href={magazine.url} target="_blank">
              {magazine.name}
            </a>
          ))}
      </section> */
}
