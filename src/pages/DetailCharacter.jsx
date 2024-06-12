import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import HelmetComponent from "../components/HelmetComponent";

export default function DetailCharacters() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  console.log(anime);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/characters/${id}`
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
            title={`MeWeeb | ${anime.name} | Character Detail`}
            keyword={
            `${anime.name}, Character, Character Info, Character Wiki, Character Detail, Character About, Character Information`
            }
            description={`${anime.name} `}
          />
          <section className="div-c-detail-anime">
            <figure>
              <img
                src={anime.images.jpg.image_url}
                alt={anime.name}
                className="img-detail-anime"
              />
            </figure>
            <aside className="div-info-anime">
              <h1>{anime.name}</h1>
              <h1>{anime.name_kanji}</h1>
              <div className="anime-desc">{anime.about}</div>
              <div className="div-info-anime2">
                <div>
                  <h3>Nicknames</h3>
                  {anime.nicknames.map((nicknames) => (
                    <li key={nicknames}>{nicknames}</li>
                  ))}
                </div>
                <div>
                  <h3>Favorites</h3>
                  <div>
                    <strong>Favorites:</strong> {anime.favorites}
                  </div>
                </div>
                
              </div>
            </aside>
          </section>
        </>
      )}
    </>
  );
}
