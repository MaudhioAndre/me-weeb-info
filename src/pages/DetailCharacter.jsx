import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import HelmetComponent from "../components/HelmetComponent";
import LoadingComp from "../components/LoadingComp";
import Logs from "../components/log/Logs";
import { UserContext } from "../components/Global";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DetailCharacters() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(false);
  const { user } = useContext(UserContext);

  console.log(anime);

  useEffect(() => {
    const fetchAnime = async () => {
      Logs(setContent, user);
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
      {content && (
        <>
          <Header />
          <main className="main-content">
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
                      <h1 className="mb-4 text-1xl font-bold text-gray-500">
                        {anime.name_kanji}
                      </h1>
                      <p className="mb-4 text-lg text-gray-300">
                        {anime.about}
                      </p>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <h2 className="mb-2 text-2xl font-semibold text-yellow-500">
                            Nicknames
                          </h2>
                          <ul className="space-y-1 list-disc list-inside">
                            {anime.nicknames.map((user, index) => (
                              <li key={index}>{user}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h2 className="mb-2 text-2xl font-semibold text-yellow-500">
                            Information
                          </h2>
                          <div className="space-y-2 ">
                            <div>
                              <strong>Favorite By :</strong> {anime.favorites}
                            </div>
                          </div>
                        </div>
                      </div>
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