import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HelmetComponent from "../components/HelmetComponent";

export default function DetailAnime() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  console.log(anime);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}`
        );
        setAnime(response.data.data);
      } catch (error) {
        console.error("Error fetching anime data:", error);
      }
    };

    fetchAnime();
  }, [id]);

  return (
    <>
      {anime && (
        <>
          <HelmetComponent
            title={`MeWeeb | ${anime.title_english} | Anime Detail`}
            keyword={
              "Anime, Anime Info, Anime Wiki, Anime Detail, Anime Synopsis, Anime Information, Anime Trailer"
            }
            description={`Dive into the world of ${anime.title_english}, Get ready for ${anime.genres.map(data => data.name)} in this captivating story!`}
          />

          <section className="div-c-detail-anime">
            <figure>
              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className="img-detail-anime"
              />
            </figure>
            <aside className="div-info-anime">
              <h1>{anime.title}</h1>
              <p className="anime-desc">{anime.synopsis}</p>
              <div className="div-info-anime2">
                <div>
                  <h3>Information</h3>
                  <div>
                    <strong>Type:</strong> {anime.type}
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
          </section>
          <section className="trailer-anime">
            <h3>Trailer</h3>
            <iframe
              width="100%"
              height="500px"
              src={anime.trailer.embed_url}
              title="YouTube video player"
              // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-lg"
            ></iframe>
          </section>
        </>
      )}
    </>
  );
}
