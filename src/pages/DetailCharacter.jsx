import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import HelmetComponent from "../components/HelmetComponent";
import LoadingComp from "../components/LoadingComp";

export default function DetailCharacters() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) <LoadingComp />;

  return (
    <>
      {anime && (
        <>
          <HelmetComponent
            title={`MeWeeb | ${anime.name} | Character Detail`}
            keyword={`${anime.name}, Character, Character Info, Character Wiki, Character Detail, Character About, Character Information`}
            description={`${anime.name} `}
          />

          <div className="min-h-screen p-4 text-white bg-black">
            <div className="container flex flex-col mx-auto lg:flex-row lg:space-x-8">
              <div className="mb-8 lg:w-1/3 lg:mb-0">
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.name}
                  className="w-full mb-4 rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-4 lg:w-2/3">
                <h1 className="mb-4 text-4xl font-bold text-yellow-500">
                  {anime.name}
                </h1>
                <h1 className="mb-4 text-4xl font-bold text-yellow-500">
                  {anime.name_kanji}
                </h1>
                <p className="mb-4 text-lg text-gray-300">{anime.about}</p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <h2 className="mb-2 text-2xl font-semibold text-yellow-500">
                      Nicknames
                    </h2>
                    {anime.nicknames.map((user, index) => (
                      <div className="space-y-2" key={index}>
                        <div>{user}</div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h2 className="mb-2 text-2xl font-semibold text-yellow-500">
                      Favorites
                    </h2>
                    <ul className="space-y-1 list-disc list-inside">
                      <li className="list-none">{anime.favorites}</li>
                    </ul>
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
</section>; */}
