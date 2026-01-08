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
  const [pictures, setPictures] = useState([]);
  const [voices, setVoices] = useState([]);
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

        const picturesResponse = await axios.get(
          `https://api.jikan.moe/v4/characters/${id}/pictures`
        );
        setPictures(picturesResponse.data.data);

        const voicesResponse = await axios.get(
          `https://api.jikan.moe/v4/characters/${id}/voices`
        );
        setVoices(voicesResponse.data.data);
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

                  {/* Pictures Section */}
                  {pictures.length > 0 && (
                    <div className="container mx-auto mt-8">
                      <h2 className="mb-4 text-2xl font-semibold text-yellow-500">
                        Character Pictures
                      </h2>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {pictures.map((pic, index) => (
                          <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                            <img
                              src={pic.jpg.image_url}
                              alt={`Character Picture ${index + 1}`}
                              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Voice Actors Section */}
                  {voices.length > 0 && (
                    <div className="container mx-auto mt-8 mb-8">
                      <h2 className="mb-4 text-2xl font-semibold text-yellow-500">
                        Voice Actors
                      </h2>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {voices.map((voice, index) => (
                          <div key={index} className="flex items-center p-4 space-x-4 bg-gray-800 rounded-lg">
                            <img
                              src={voice.person.images.jpg.image_url}
                              alt={voice.person.name}
                              className="object-cover w-16 h-16 rounded-full"
                            />
                            <div>
                              <h3 className="font-semibold text-white">{voice.person.name}</h3>
                              <p className="text-sm text-gray-400">{voice.language}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

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