import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HelmetComponent from "../components/HelmetComponent";


export default function DetailManga() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

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
      }
    };

    fetchAnime();
  }, [id]);

  return (
    <>
      {anime && (
        <>
        <HelmetComponent
            title={`MeWeeb | ${anime.title_english} | Manga Detail`}
            keyword={
              "Manga, Manga Info, Manga Wiki, Manga Detail, Manga Synopsis, Manga Information, Manga Trailer"
            }
            description={`Dive into ${anime.title_english}, Get ready for ${anime.genres.map(data => data.name)} in this captivating story!`}
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
          </section>
        </>
      )}
    </>
  );
}
