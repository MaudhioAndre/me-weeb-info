import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ListAnime from "./ListAnime";
import ListManga from "./ListManga";
import ListCharacter from "./ListCharacter";

import { BeatLoader } from "react-spinners";

import {
  fetchRandomAnime,
  fetchTopAnime,
  fetchTopCharacters,
  fetchTopManga,
} from "../api/jikanApi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HelmetComponent from "../components/HelmetComponent";

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

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <HelmetComponent
        title={`MeWeeb | Anime Information, Reviews, News, Recommendations and Clubs{" "}`}
        keyword={
          "Anime, Anime Info, Anime Wiki, Anime Recommendation, Anime Clubs Tips, Anime Information, Manga, Anime Reviews, Anime News"
        }
        description={`Find all the latest anime information on me-weeb-info! We provide anime reviews, latest news, anime recommendations, and more.`}
      />

      <Header />
      {/* <Hero randomAnime={randomAnime} /> */}
      <ListAnime animeList={topAnime} />
      <ListManga mangaList={topManga} />
      <ListCharacter characterList={topCharacters} />
      <Footer />
    </>
  );
}
