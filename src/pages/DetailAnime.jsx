import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import TruncateTitle from "../components/TruncateTitle";
import axios from "axios";
import HelmetComponent from "../components/HelmetComponent";
import LoadingComp from "../components/LoadingComp";
import Logs from "../components/log/Logs";
import { UserContext } from "../components/Global";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollCountdown from "../components/ScrollCountdown";

export default function DetailAnime() {
  const { idAnime } = useParams();
  const [anime, setAnime] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [news, setNews] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(false);
  const { user } = useContext(UserContext);

  console.log(anime);

  useEffect(() => {
    const fetchAnime = async () => {
      Logs(setContent, user);
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime/${idAnime}/full`
        );
        setAnime(response.data.data);
      } catch (error) {
        console.error("Error fetching anime data:", error);
      }
    };

    const fetchAdditionalData = async () => {
      try {
        const [charRes, newsRes, recRes, picRes] = await Promise.all([
          axios.get(`https://api.jikan.moe/v4/anime/${idAnime}/characters`),
          axios.get(`https://api.jikan.moe/v4/anime/${idAnime}/news`),
          axios.get(`https://api.jikan.moe/v4/anime/${idAnime}/recommendations`),
          axios.get(`https://api.jikan.moe/v4/anime/${idAnime}/pictures`),
        ]);

        setCharacters(charRes.data.data);
        setNews(newsRes.data.data);
        setRecommendations(recRes.data.data);
        setPictures(picRes.data.data);
      } catch (error) {
        console.error("Error fetching additional anime data:", error);
      }
    };

    fetchAnime();
    fetchAdditionalData();
  }, [idAnime, user]);

  if (loading) <LoadingComp />;

  return (
    <>
      {content && (
        <>
          <Header />
          <main className="main-content">
            {anime && (
              <>
                <ScrollCountdown />
                <HelmetComponent
                  title={`MeWeeb | ${anime.title_english} | Anime Detail`}
                  keyword={
                    "Anime, Anime Info, Anime Wiki, Anime Detail, Anime Synopsis, Anime Information, Anime Trailer"
                  }
                  description={`Dive into the world of ${
                    anime.title_english
                  }, Get ready for ${anime.genres.map(
                    (data) => data.name
                  )} in this captivating story!`}
                />
                <div className="min-h-screen p-4 text-white bg-black">
                  <div className="container flex flex-col mx-auto lg:flex-row lg:space-x-8">
                    <div className="mb-8 lg:w-1/3 lg:mb-0">
                      <img
                        src={anime.images.jpg.large_image_url}
                        alt={anime.title}
                        className="w-full mb-4 rounded-lg shadow-lg"
                      />
                    </div>
                    <div className="space-y-4 lg:w-2/3">
                      <h1 className=" text-4xl font-bold text-yellow-500">
                        {anime.title}
                      </h1>
                      <h1 className="text-1xl font-bold text-gray-500">
                        {anime.title !== anime.title_english &&
                          anime.title_english}
                      </h1>

                      <p className="mb-4 text-lg text-gray-300">
                        {anime.synopsis}
                      </p>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <h2 className="mb-2 text-2xl font-semibold text-yellow-500">
                            Information
                          </h2>
                          <div className="space-y-2">
                            <div>
                              <strong>Type:</strong> {anime.type}
                            </div>
                            <div>
                              <strong>Season:</strong> {anime.season}
                            </div>
                            <div>
                              <strong>Year:</strong> {anime.year}
                            </div>
                            <div>
                              <strong>Episodes:</strong> {anime.episodes}
                            </div>
                            <div>
                              <strong>Status:</strong> {anime.status}
                            </div>
                            <div>
                              <strong>Duration:</strong> {anime.duration}
                            </div>
                            <div>
                              <strong>Rating:</strong> {anime.rating}
                            </div>
                            <div>
                              <strong>Score:</strong> {anime.score}
                            </div>
                            <div>
                              <strong>Popularity:</strong> #{anime.popularity}
                            </div>
                            <div>
                              <strong>Favorite by:</strong> {anime.favorites}
                            </div>
                          </div>
                        </div>
                        <div>
                          <h2 className="mb-2 text-2xl font-semibold text-yellow-500">
                            Genres & Demographics
                          </h2>
                          <ul className="space-y-1 list-disc list-inside">
                            {anime.genres.map((genre) => (
                              <li key={genre.mal_id}>{genre.name}</li>
                            ))}
                            {anime.demographics.map((demographic) => (
                              <li key={demographic.mal_id}>
                                {demographic.name}
                              </li>
                            ))}
                          </ul>
                          <h2 className="mt-2 mb-2 text-2xl font-semibold text-yellow-500">
                            Producers
                          </h2>
                          <ul className="space-y-1 list-disc list-inside">
                            {anime.producers.map((prod) => (
                              <li key={prod.mal_id}>{prod.name}</li>
                            ))}
                          </ul>
                          <h2 className="mt-2 text-2xl font-semibold text-yellow-500">
                            Studio
                          </h2>
                          {anime.studios.map((studio) => (
                            <div className="mt-2" key={studio.mal_id}>
                              {studio.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {anime.trailer.embed_url !== null && (
                    <div className="mt-8">
                      <h2 className="mb-4 text-2xl font-semibold text-yellow-500">
                        Trailer
                      </h2>
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe
                          width="100%"
                          height="500px"
                          src={anime.trailer.embed_url}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-lg shadow-lg"
                        ></iframe>
                      </div>
                    </div>
                  )}
                </div>

                {/* Characters Section */}
                <div className="container mx-auto px-4 py-8">
                  <h2 className="text-2xl font-semibold text-yellow-500 mb-4">
                    Characters
                  </h2>
                  <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-gray-800">
                    {characters.map((char) => (
                      <div
                        key={char.character.mal_id}
                        className="flex-none w-40 bg-gray-900 rounded-lg overflow-hidden shadow-lg"
                      >
                        <img
                          src={char.character.images.jpg.image_url}
                          alt={char.character.name}
                          className="w-full h-56 object-cover"
                        />
                        <div className="p-2">
                          <h3 className="text-sm font-bold text-white truncate">
                            {char.character.name}
                          </h3>
                          <p className="text-xs text-gray-400">{char.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* News Section */}
                <div className="container mx-auto px-4 py-8 text-white">
                  <h2 className="text-2xl font-semibold text-yellow-500 mb-4">
                    News
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {news.slice(0, 6).map((item) => (
                      <div
                        key={item.mal_id}
                        className="bg-gray-900 p-4 rounded-lg shadow-lg flex flex-col justify-between"
                      >
                        <div>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-bold text-blue-400 hover:underline"
                          >
                            {item.title}
                          </a>
                          <p className="text-sm text-gray-400 mt-2">
                            {new Date(item.date).toLocaleDateString()}
                          </p>
                          <p className="text-gray-300 mt-2 text-sm">
                            {item.excerpt}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pictures Section */}
                <div className="container mx-auto px-4 py-8">
                  <h2 className="text-2xl font-semibold text-yellow-500 mb-4">
                    Pictures
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {pictures.map((pic, index) => (
                      <div
                        key={index}
                        className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden"
                      >
                        <img
                          src={pic.jpg.large_image_url}
                          alt={`Anime Picture ${index}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations Section */}
                <div className="container mx-auto px-4 py-8">
                  <h2 className="text-2xl font-semibold text-yellow-500 mb-4">
                    Recommendations
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {recommendations.slice(0, 12).map((rec) => (
                      <Link
                        to={`/anime/${rec.entry.mal_id}`}
                        key={rec.entry.mal_id}
                        className="relative rounded-lg overflow-hidden shadow-lg group block"
                      >
                        <img
                          src={rec.entry.images.jpg.large_image_url}
                          alt={rec.entry.title}
                          className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 p-2">
                          <h3 className="text-sm font-bold text-white text-center">
                             {TruncateTitle(rec.entry.title, 20)}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
