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

export default function DetailManga() {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [news, setNews] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(UserContext);

  console.log(manga);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setManga(null);
    setCharacters([]);
    setNews([]);
    setRecommendations([]);
    setPictures([]);
    setReviews([]);

    const fetchAllData = async () => {
      Logs(setContent, user);
      try {
        const { data: mangaData } = await axios.get(
          `https://api.jikan.moe/v4/manga/${id}`
        );
        setManga(mangaData.data);

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
        console.error("Error fetching manga data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id, user]);

  if (loading) return <LoadingComp />;

  return (
    <>
      {content && (
        <>
          <Header />
          <main className="main-content">
            {manga && (
              <>
                {/* <ScrollCountdown /> */}
                <HelmetComponent
                  title={`MeWeeb | ${manga.title_english || manga.title} | Manga Detail`}
                  keyword={
                    "Manga, Manga Info, Manga Wiki, Manga Detail, Manga Synopsis, Manga Information, Manga Review"
                  }
                  description={`Dive into the world of ${manga.title_english || manga.title
                    }. Get ready for ${manga.genres.map(
                      (data) => data.name
                    ).join(', ')} in this captivating story!`}
                  canonical={`${window.location.origin}/manga/${id}`}
                  image={manga.images.jpg.large_image_url}
                  type="book"
                >
                  <script type="application/ld+json">
                    {JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "Book",
                      "name": manga.title_english || manga.title,
                      "alternateName": manga.title,
                      "image": manga.images.jpg.large_image_url,
                      "description": manga.synopsis,
                      "genre": manga.genres.map(g => g.name),
                      "datePublished": manga.published?.from,
                      "aggregateRating": manga.score ? {
                        "@type": "AggregateRating",
                        "ratingValue": manga.score,
                        "ratingCount": manga.scored_by
                      } : undefined,
                      "author": manga.authors?.map(a => ({
                        "@type": "Person",
                        "name": a.name
                      }))
                    })}
                  </script>
                </HelmetComponent>
                <div className="min-h-screen p-4 px-10 text-white bg-black">
                  <MangaInfo manga={manga} />
                  <CharactersSection characters={characters} />
                  <PicturesSection pictures={pictures} manga={manga} />
                  <div className="flex flex-wrap">
                    <RecommendationsSection recommendations={recommendations} />
                    <NewsSection news={news} />
                  </div>
                  <ReviewsSection reviews={reviews} />
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

const MangaInfo = ({ manga }) => {
  return (
    <>
      <section className="container flex flex-col mx-auto lg:flex-row lg:space-x-8" aria-labelledby="manga-info-heading">
        <div className="mb-8 lg:w-1/3 lg:mb-0">
          <img
            src={manga.images.jpg.large_image_url}
            alt={`${manga.title_english || manga.title} - Official Manga Cover`}
            className="w-full mb-4 rounded-lg shadow-lg"
          />
        </div>
        <div className="space-y-4 lg:w-2/3">
          <h1 id="manga-info-heading" className="text-4xl font-bold text-yellow-500">{manga.title}</h1>
          {manga.title !== manga.title_english && manga.title_english && (
            <p className="text-xl font-bold text-gray-500">
              {manga.title_english}
            </p>
          )}

          <p className="mb-4 text-lg text-gray-300">{manga.synopsis}</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h2 className="mb-2 text-2xl font-semibold text-yellow-500">
                Information
              </h2>
              <dl className="space-y-2">
                <div>
                  <dt className="inline font-bold">Type: </dt>
                  <dd className="inline">{manga.type}</dd>
                </div>
                <div>
                  <dt className="inline font-bold">Status: </dt>
                  <dd className="inline">{manga.status}</dd>
                </div>
                {manga.chapters && (
                  <div>
                    <dt className="inline font-bold">Chapters: </dt>
                    <dd className="inline">{manga.chapters}</dd>
                  </div>
                )}
                {manga.volumes && (
                  <div>
                    <dt className="inline font-bold">Volumes: </dt>
                    <dd className="inline">{manga.volumes}</dd>
                  </div>
                )}
                {manga.score && (
                  <div>
                    <dt className="inline font-bold">Score: </dt>
                    <dd className="inline">{manga.score}</dd>
                  </div>
                )}
                {manga.popularity && (
                  <div>
                    <dt className="inline font-bold">Popularity: </dt>
                    <dd className="inline">#{manga.popularity}</dd>
                  </div>
                )}
                {manga.favorites && (
                  <div>
                    <dt className="inline font-bold">Favorite by: </dt>
                    <dd className="inline">{manga.favorites}</dd>
                  </div>
                )}
              </dl>
            </div>
            <div>
              {manga.genres && manga.genres.length > 0 && (
                <>
                  <h3 className="mb-2 text-xl font-semibold text-yellow-500">
                    Genres & Demographics
                  </h3>
                  <ul className="space-y-1 list-disc list-inside">
                    {manga.genres.map((genre) => (
                      <li key={genre.mal_id}>{genre.name}</li>
                    ))}
                    {manga.demographics && manga.demographics.map((demographic) => (
                      <li key={demographic.mal_id}>{demographic.name}</li>
                    ))}
                  </ul>
                </>
              )}
              {manga.authors && manga.authors.length > 0 && (
                <>
                  <h3 className="mt-4 mb-2 text-xl font-semibold text-yellow-500">
                    Authors
                  </h3>
                  <ul className="space-y-1 list-disc list-inside">
                    {manga.authors.map((author) => (
                      <li key={author.mal_id}>{author.name}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const CharactersSection = ({ characters }) => {
  if (!characters || characters.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-8" aria-labelledby="characters-heading">
      <h2 id="characters-heading" className="text-2xl font-semibold text-yellow-500 mb-4">
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
    </section>
  );
};

const PicturesSection = ({ pictures, manga }) => {
  if (!pictures || pictures.length === 0) return null;

  return (
    <section className="container mx-auto px-5 py-8" aria-labelledby="pictures-heading">
      <h2 id="pictures-heading" className="text-2xl font-semibold text-yellow-500 mb-4">Pictures</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {pictures.map((pic, index) => (
          <div
            key={index}
            className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden"
          >
            <img
              src={pic.jpg.large_image_url}
              alt={`${manga?.title_english || manga?.title || 'Manga'} - Picture ${index + 1}`}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

const RecommendationsSection = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <section className="w-[50%] container mx-auto px-5 py-8" aria-labelledby="recommendations-heading">
      <h2 id="recommendations-heading" className="text-2xl font-semibold text-yellow-500 mb-4">
        Recommendations
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendations.slice(0, 12).map((rec) => (
          <Link
            to={`/manga/${rec.entry.mal_id}`}
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
    </section>
  );
};

const NewsSection = ({ news }) => {
  if (!news || news.length === 0) return null;

  return (
    <section className="w-[50%] container mx-auto px-5 py-8 text-white" aria-labelledby="news-heading">
      <h2 id="news-heading" className="text-2xl font-semibold text-yellow-500 mb-4">News</h2>
      <div className="grid grid-cols-1 gap-4">
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
              <p className="text-gray-300 mt-2 text-sm">{item.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ReviewsSection = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="container mx-auto py-8" aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="text-2xl font-semibold text-yellow-500 mb-4">
        Reviews
      </h2>
      <div className="space-y-4">
        {reviews.slice(0, 5).map((review) => (
          <article key={review.mal_id} className="p-4 bg-gray-900 rounded-lg shadow-lg">
            <div className="flex items-center mb-2">
              <img
                src={review.user.images.jpg.image_url}
                alt={`${review.user.username}'s profile picture`}
                className="w-10 h-10 mr-3 rounded-full"
              />
              <div>
                <h3 className="font-bold text-white">{review.user.username}</h3>
                <p className="text-xs text-gray-400">
                  <time dateTime={review.date}>
                    {new Date(review.date).toLocaleDateString()}
                  </time>
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-300">{review.review.slice(0, 300)}...</p>
            <a
              href={review.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:underline"
            >
              Read more
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};