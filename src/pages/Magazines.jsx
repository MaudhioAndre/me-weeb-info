import React, { useEffect, useState } from "react";
import axios from "axios";

import { Helmet } from "react-helmet";

export default function Magazines() {
  const [magazines, setMagazines] = useState([]);
  console.log(magazines);

  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        const response = await axios.get("https://api.jikan.moe/v4/magazines");
        setMagazines(response.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchMagazines();
  }, []);

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
      <center>
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
      </section>
    </>
  );
}
