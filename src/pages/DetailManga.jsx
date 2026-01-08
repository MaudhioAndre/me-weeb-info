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

export default function DetailManga() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [news, setNews] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(UserContext);

  console.log(anime);

  useEffect(() => {
    const fetchAnime = async () => {
      Logs(setContent, user);

      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/manga/${id}`
        );
        setAnime(response.data.data);
      } catch (error) {
        console.error("Error fetching anime data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAdditionalData = async () => {
      try {
        const [charRes, newsRes, recRes, picRes, revRes] = await Promise.all([
          axios.get(`https://api.jikan.moe/v4/manga/${id}/characters`),
          axios.get(`https://api.jikan.moe/v4/manga/${id}/news`),
          axios.get(`https://api.jikan.moe/v4/manga/${id}/recommendations`),
          axios.get(`https://api.jikan.moe/v4/manga/${id}/pictures`),
          axios.get(`https://api.jikan.moe/v4/manga/${id}/reviews`),
        ]);

        setCharacters(charRes.data.data);
        setNews(newsRes.data.data);
        setRecommendations(recRes.data.data);
        setPictures(picRes.data.data);
        setReviews(revRes.data.data);
      } catch (error) {
        console.error("Error fetching additional anime data:", error);
      }
    };

    fetchAnime();
    fetchAdditionalData();
  }, [id, user]);

  if (loading) <LoadingComp />;

  return (
    <>
      {content && (
        <>
          <Header />
          <main className="main-content">
            {anime && (
              <>
                <HelmetComponent
                  title={`MeWeeb | ${anime.title_english} | Manga Detail`}
                  keyword={
                    "Manga, Manga Info, Manga Wiki, Manga Detail, Manga Synopsis, Manga Information, Manga Trailer"
                  }
                  description={`Dive into ${anime.title_english
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
                      <h1 className="mb-4 text-4xl font-bold text-yellow-500">
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
                              <strong>Status:</strong> {anime.status}
                            </div>
                            <div>
                              <strong>Chapters:</strong> {anime.chapters}
                            </div>
                            <div>
                              <strong>Volumes:</strong> {anime.volumes}
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
                          <h2 className="mt-2 text-2xl font-semibold text-yellow-500">
                            Authors
                          </h2>
                          {anime.authors.map((author) => (
                            <div className="mt-2" key={author.mal_id}>
                              {author.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Characters Section */}
                  <div className="container mx-auto mt-8">
                    <h2 className="mb-4 text-2xl font-semibold text-yellow-500">
                      Characters
                    </h2>
                    <div className="flex pb-4 space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-gray-800">
                      {characters.map((char) => (
                        <div
                          key={char.character.mal_id}
                          className="flex-none w-40 overflow-hidden bg-gray-900 rounded-lg shadow-lg"
                        >
                          <img
                            src={char.character.images.jpg.image_url}
                            alt={char.character.name}
                            className="object-cover w-full h-56"
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
                  <div className="container mx-auto mt-8 text-white">
                    <h2 className="mb-4 text-2xl font-semibold text-yellow-500">
                      News
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {news.slice(0, 6).map((item) => (
                        <div
                          key={item.mal_id}
                          className="flex flex-col justify-between p-4 bg-gray-900 rounded-lg shadow-lg"
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
                            <p className="mt-2 text-sm text-gray-400">
                              {new Date(item.date).toLocaleDateString()}
                            </p>
                            <p className="mt-2 text-sm text-gray-300">
                              {item.excerpt}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pictures Section */}
                  <div className="container mx-auto mt-8">
                    <h2 className="mb-4 text-2xl font-semibold text-yellow-500">
                      Pictures
                    </h2>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                      {pictures.map((pic, index) => (
                        <div
                          key={index}
                          className="overflow-hidden rounded-lg aspect-w-3 aspect-h-4"
                        >
                          <img
                            src={pic.jpg.large_image_url}
                            alt={`Manga Picture ${index}`}
                            className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations Section */}
                  <div className="container mx-auto mt-8">
                    <h2 className="mb-4 text-2xl font-semibold text-yellow-500">
                      Recommendations
                    </h2>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                      {recommendations.slice(0, 12).map((rec) => (
                        <Link
                          to={`/manga/${rec.entry.mal_id}`}
                          key={rec.entry.mal_id}
                          className="relative block overflow-hidden rounded-lg shadow-lg group"
                        >
                          <img
                            src={rec.entry.images.jpg.large_image_url}
                            alt={rec.entry.title}
                            className="object-cover w-full h-64 transition-transform duration-300 transform group-hover:scale-110"
                          />
                          <div className="absolute left-0 right-0 bottom-0 p-2 bg-black bg-opacity-80">
                            <h3 className="text-sm font-bold text-center text-white">
                              {TruncateTitle(rec.entry.title, 20)}
                            </h3>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Reviews Section */}
                  <div className="container mx-auto mt-8 mb-8">
                    <h2 className="mb-4 text-2xl font-semibold text-yellow-500">
                      Reviews
                    </h2>
                    <div className="space-y-4">
                      {reviews.slice(0, 5).map((review) => (
                        <div key={review.mal_id} className="p-4 bg-gray-900 rounded-lg shadow-lg">
                          <div className="flex items-center mb-2">
                            <img
                              src={review.user.images.jpg.image_url}
                              alt={review.user.username}
                              className="w-10 h-10 mr-3 rounded-full"
                            />
                            <div>
                              <h3 className="font-bold text-white">{review.user.username}</h3>
                              <p className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-300">{review.review.slice(0, 300)}...</p>
                          <a href={review.url} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:underline">Read more</a>
                        </div>
                      ))}
                    </div>
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