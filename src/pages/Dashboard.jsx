import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ListAnime from "./ListAnime";
import ListManga from "./ListManga";
import ListCharacter from "./ListCharacter";

import { BeatLoader } from "react-spinners";

import { Helmet } from "react-helmet";
import {
  fetchRandomAnime,
  fetchTopAnime,
  fetchTopCharacters,
  fetchTopManga,
} from "../api/jikanApi";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [topAnime, setTopAnime] = useState([]);
  const [randomAnime, setRandomAnime] = useState([]);
  const [topCharacters, setTopCharacters] = useState([]);
  const [topManga, setTopManga] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Top Anime data
        const topAnimeResponse = await fetchTopAnime();
        setTopAnime(topAnimeResponse.data.data.slice(0, 6));

        // Fetch Top Manga data
        const topMangaResponse = await fetchTopManga();
        setTopManga(topMangaResponse.data.data.slice(0, 6));

        // Fetch Top Characters data
        const topCharactersResponse = await fetchTopCharacters();
        setTopCharacters(topCharactersResponse.data.data.slice(0, 6));

        // // Fetch Random Anime data
        const randomAnimeResponse = await fetchRandomAnime();
        setRandomAnime(randomAnimeResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Gagal Mengambil Data, Silahkan Coba Kembali.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          MeWeeb | Anime Information, Reviews, News, Recommendations and Clubs{" "}
        </title>
        <meta name="robots" content="index,follow" />
        <meta
          name="keywords"
          content="Anime, Anime Info, Anime Wiki, Anime Recommendation, Anime Clubs Tips, Anime Information, Manga, Anime Reviews, Anime News"
        />
        <meta
          name="description"
          content="Find all the latest anime information on me-weeb-info! We provide anime reviews, latest news, anime recommendations, and more."
        />
      </Helmet>

      {/* <p className="mt-2">Loading...</p> */}
{/* 
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <BeatLoader color={"#ffffff"} loading={loading} size={15} />
          <div className="flex text-3xl ">
            <>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
                M
              </span>
              e
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
                W
              </span>
              <h1>eeb</h1>
            </>
          </div>
          <div className="text-1xl">Find all the latest anime information on me-weeb-info! We provide anime reviews, latest news, anime recommendations, and more.</div>
          <h2>Sedang Mengambil Data</h2>
        </div>
      ) : error ? (
        <p>Something wrong in server</p>
      ) : (
        <> */}
          <Header />
          <Hero randomAnime={randomAnime} />
          <ListAnime animeList={topAnime} />
          <ListManga mangaList={topManga} />
          <ListCharacter characterList={topCharacters} />
          <Footer />
        {/* </>
      )} */}
    </>
  );
}
