import React, { useEffect, useState, useContext } from "react";
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
import Hero2 from "../components/Hero2";
import Logs from "../components/log/Logs";
import { UserContext } from "../components/Global";

export default function Dashboard() {
  const [topAnime, setTopAnime] = useState([]);
  const [randomAnime, setRandomAnime] = useState([]);
  const [topCharacters, setTopCharacters] = useState([]);
  const [topManga, setTopManga] = useState([]);
  const [content, setContent] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      Logs(setContent, user);
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
      {content && (
        <>
          <Header />
          <main className="main-content">
            <HelmetComponent
              title={`MeWeeb | Anime Information, Reviews, News, Recommendations and Clubs{" "}`}
              canonLink={process.env.REACT_APP_LINK_URL}
              description={`Find all the latest anime information on me-weeb-info! We provide anime reviews, latest news, anime recommendations, and more.`}
            />
            <Hero2 />
            <ListAnime animeList={topAnime} />
            <ListManga mangaList={topManga} />
            <ListCharacter characterList={topCharacters} />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
