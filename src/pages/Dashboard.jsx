import React from "react";
import Hero from "../components/Hero";
import ListAnime from "./ListAnime";
import ListManga from "./ListManga";
import ListCharacter from "./ListCharacter";

import { Helmet } from "react-helmet";

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MeWeeb | Anime Information, Reviews, News, Recommendations and Clubs </title>
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
      <Hero />
      <ListAnime />
      <ListManga />
      <ListCharacter />
    </>
  );
}
