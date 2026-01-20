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
    window.scrollTo(0, 0);
    setLoading(true);
    setAnime(null);
    setCharacters([]);
    setNews([]);
    setRecommendations([]);
    setPictures([]);

    const fetchAllData = async () => {
      Logs(setContent, user);
      try {
        const { data: animeData } = await axios.get(
          `https://api.jikan.moe/v4/anime/${idAnime}/full`
        );
        setAnime(animeData.data);

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
        console.error("Error fetching anime data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [idAnime, user]);

  if (loading) return <LoadingComp />;

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
                  title={`MeWeeb | ${anime.title_english || anime.title} | Anime Detail`}
                  keyword={
                    "Anime, Anime Info, Anime Wiki, Anime Detail, Anime Synopsis, Anime Information, Anime Trailer"
                  }
                  description={`Dive into the world of ${anime.title_english || anime.title
                    }. Get ready for ${anime.genres.map(
                      (data) => data.name
                    ).join(', ')} in this captivating story!`}
                  canonical={`${window.location.origin}/anime/${idAnime}`}
                  image={anime.images.jpg.large_image_url}
                  type="video.tv_show"
                >
                  <script type="application/ld+json">
                    {JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "TVSeries",
                      "name": anime.title_english || anime.title,
                      "alternateName": anime.title,
                      "image": anime.images.jpg.large_image_url,
                      "description": anime.synopsis,
                      "genre": anime.genres.map(g => g.name),
                      "datePublished": anime.aired?.from,
                      "aggregateRating": anime.score ? {
                        "@type": "AggregateRating",
                        "ratingValue": anime.score,
                        "ratingCount": anime.scored_by
                      } : undefined,
                      "numberOfEpisodes": anime.episodes,
                      "productionCompany": anime.studios.map(s => ({
                        "@type": "Organization",
                        "name": s.name
                      }))
                    })}
                  </script>
                </HelmetComponent>
                <div className="min-h-screen p-4 px-10 text-white bg-black">
                  <AnimeInfo anime={anime} />
                  <CharactersSection characters={characters} />

                  <div className="flex flex-wrap">
                    <TrailerSection trailer={anime.trailer} />
                    <PicturesSection pictures={pictures} anime={anime} />
                  </div>

                  <div className="flex flex-wrap">
                    <RecommendationsSection recommendations={recommendations} />
                    <NewsSection news={news} />
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

const AnimeInfo = ({ anime }) => {
  return (
    <>
      <section className="container flex flex-col mx-auto lg:flex-row lg:space-x-8" aria-labelledby="anime-info-heading">
        <div className="mb-8 lg:w-1/3 lg:mb-0">
          <img
            src={anime.images.jpg.large_image_url}
            alt={`${anime.title_english || anime.title}`}
            className="w-full mb-4 rounded-lg shadow-lg"
          />
        </div>
        <div className="space-y-4 lg:w-2/3">
          <h1 id="anime-info-heading" className="text-4xl font-bold text-yellow-500">{anime.title}</h1>
          {anime.title !== anime.title_english && anime.title_english && (
            <p className="text-xl font-bold text-gray-500">
              {anime.title_english}
            </p>
          )}

          <p className="mb-4 text-lg text-gray-300">{anime.synopsis}</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h2 className="mb-2 text-2xl font-semibold text-yellow-500">
                Information
              </h2>
              <dl className="space-y-2">
                <div>
                  <dt className="inline font-bold">Type: </dt>
                  <dd className="inline">{anime.type}</dd>
                </div>
                {anime.season && (
                  <div>
                    <dt className="inline font-bold">Season: </dt>
                    <dd className="inline">{anime.season}</dd>
                  </div>
                )}
                {anime.year && (
                  <div>
                    <dt className="inline font-bold">Year: </dt>
                    <dd className="inline">{anime.year}</dd>
                  </div>
                )}
                {anime.episodes && (
                  <div>
                    <dt className="inline font-bold">Episodes: </dt>
                    <dd className="inline">{anime.episodes}</dd>
                  </div>
                )}
                <div>
                  <dt className="inline font-bold">Status: </dt>
                  <dd className="inline">{anime.status}</dd>
                </div>
                {anime.duration && (
                  <div>
                    <dt className="inline font-bold">Duration: </dt>
                    <dd className="inline">{anime.duration}</dd>
                  </div>
                )}
                {anime.rating && (
                  <div>
                    <dt className="inline font-bold">Rating: </dt>
                    <dd className="inline">{anime.rating}</dd>
                  </div>
                )}
                {anime.score && (
                  <div>
                    <dt className="inline font-bold">Score: </dt>
                    <dd className="inline">{anime.score}</dd>
                  </div>
                )}
                {anime.popularity && (
                  <div>
                    <dt className="inline font-bold">Popularity: </dt>
                    <dd className="inline">#{anime.popularity}</dd>
                  </div>
                )}
                {anime.favorites && (
                  <div>
                    <dt className="inline font-bold">Favorite by: </dt>
                    <dd className="inline">{anime.favorites}</dd>
                  </div>
                )}
              </dl>
            </div>
            <div>
              {anime.genres && anime.genres.length > 0 && (
                <>
                  <h3 className="mb-2 text-xl font-semibold text-yellow-500">
                    Genres & Demographics
                  </h3>
                  <ul className="space-y-1 list-disc list-inside">
                    {anime.genres.map((genre) => (
                      <li key={genre.mal_id}>{genre.name}</li>
                    ))}
                    {anime.demographics && anime.demographics.map((demographic) => (
                      <li key={demographic.mal_id}>{demographic.name}</li>
                    ))}
                  </ul>
                </>
              )}
              {anime.producers && anime.producers.length > 0 && (
                <>
                  <h3 className="mt-4 mb-2 text-xl font-semibold text-yellow-500">
                    Producers
                  </h3>
                  <ul className="space-y-1 list-disc list-inside">
                    {anime.producers.map((prod) => (
                      <li key={prod.mal_id}>{prod.name}</li>
                    ))}
                  </ul>
                </>
              )}
              {anime.studios && anime.studios.length > 0 && (
                <>
                  <h3 className="mt-4 mb-2 text-xl font-semibold text-yellow-500">
                    Studio
                  </h3>
                  <ul className="space-y-1 list-disc list-inside">
                    {anime.studios.map((studio) => (
                      <li key={studio.mal_id}>{studio.name}</li>
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

const TrailerSection = ({ trailer }) => {
  if (!trailer || trailer.embed_url === null) return null;

  return (
    <section className="w-[50%] mt-8 p-3" aria-labelledby="trailer-heading">
      <h2 id="trailer-heading" className="mb-4 text-2xl font-semibold text-yellow-500">Trailer</h2>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          width="100%"
          height="400px"
          src={trailer.embed_url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg shadow-lg"
        ></iframe>
      </div>
    </section>
  );
};

const PicturesSection = ({ pictures, anime }) => {
  if (!pictures || pictures.length === 0) return null;

  return (
    <section className="w-[50%] container mx-auto px-5 py-8" aria-labelledby="pictures-heading">
      <h2 id="pictures-heading" className="text-2xl font-semibold text-yellow-500 mb-4">Pictures</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pictures.map((pic, index) => (
          <div
            key={index}
            className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden"
          >
            <img
              src={pic.jpg.large_image_url}
              // alt={`${anime?.title_english || anime?.title || 'Anime'} - Picture ${index + 1}`}
              alt={'anime picture'}
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
