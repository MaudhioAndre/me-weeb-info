import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HelmetComponent from "../components/HelmetComponent";
import LoadingComp from "../components/LoadingComp";

export default function DetailManga() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(anime);

  useEffect(() => {
    const fetchAnime = async () => {
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

    fetchAnime();
  }, [id]);

  if (loading) <LoadingComp />;

  return (
    <>
      {anime && (
        <>
          <HelmetComponent
            title={`MeWeeb | ${anime.title_english} | Manga Detail`}
            keyword={
              "Manga, Manga Info, Manga Wiki, Manga Detail, Manga Synopsis, Manga Information, Manga Trailer"
            }
            description={`Dive into ${
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
                <h1 className="mb-4 text-4xl font-bold text-yellow-500">
                  {anime.title}
                </h1>
                <h1 className="text-1xl font-bold text-gray-500">
                  {anime.title !== anime.title_english && anime.title_english}
                </h1>
                <p className="mb-4 text-lg text-gray-300">{anime.synopsis}</p>
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
                        <li key={demographic.mal_id}>{demographic.name}</li>
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
          </div>
        </>
      )}
    </>
  );
}

{/* <section className="div-c-detail-anime">
  <figure>
    <img
      src={anime.images.jpg.large_image_url}
      alt={anime.title}
      className="img-detail-anime"
    />
  </figure>
  <aside className="div-info-anime">
    <h1>{anime.title}</h1>
    <div className="anime-desc">{anime.synopsis}</div>
    <div className="div-info-anime2">
      <div>
        <h3>Information</h3>
        <div>
          <strong>Type:</strong> {anime.type}
        </div>
        <div>
          <strong>Status:</strong> {anime.status}
        </div>
        <div>
          <strong>Score:</strong> {anime.score}
        </div>
      </div>
      <div>
        <h3>Genre & Demographics</h3>
        {anime.genres.map((genre) => (
          <li key={genre.mal_id}>{genre.name}</li>
        ))}
        {anime.demographics.map((demographic) => (
          <li key={demographic.mal_id}>{demographic.name}</li>
        ))}
      </div>
    </div>
  </aside>
</section>; */}
