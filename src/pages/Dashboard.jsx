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
          <Header />
          {/* <Hero randomAnime={randomAnime} /> */}
          <ListAnime animeList={topAnime} />
          <ListManga mangaList={topManga} />
          <ListCharacter characterList={topCharacters} />
          <Footer />
    </>
  );
}
