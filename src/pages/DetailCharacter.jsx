import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import HelmetComponent from "../components/HelmetComponent";
import LoadingComp from "../components/LoadingComp";
import Logs from "../components/log/Logs";
import { UserContext } from "../components/Global";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollCountdown from "../components/ScrollCountdown";

export default function DetailCharacters() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [voices, setVoices] = useState([]);
  const { user } = useContext(UserContext);

  console.log(character);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setCharacter(null);
    setPictures([]);
    setVoices([]);

    const fetchAllData = async () => {
      Logs(setContent, user);
      try {
        const { data: characterData } = await axios.get(
          `https://api.jikan.moe/v4/characters/${id}`
        );
        setCharacter(characterData.data);

        const [picturesRes, voicesRes] = await Promise.all([
          axios.get(`https://api.jikan.moe/v4/characters/${id}/pictures`),
          axios.get(`https://api.jikan.moe/v4/characters/${id}/voices`),
        ]);

        setPictures(picturesRes.data.data);
        setVoices(voicesRes.data.data);
      } catch (error) {
        console.error("Error fetching character data:", error);
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
            {character && (
              <>
                {/* <ScrollCountdown /> */}
                <HelmetComponent
                  title={`MeWeeb | ${character.name} | Character Detail`}
                  keyword={`${character.name}, Character, Character Info, Character Wiki, Character Detail, Character About, Character Information, Anime Character`}
                  description={`Learn about ${character.name}${character.name_kanji ? ` (${character.name_kanji})` : ''}. ${character.about ? character.about.slice(0, 150) : 'Discover character information, pictures, and voice actors.'}`}
                  canonical={`${window.location.origin}/character/${id}`}
                  image={character.images.jpg.image_url}
                  type="profile"
                >
                  <script type="application/ld+json">
                    {JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "Person",
                      "name": character.name,
                      "alternateName": character.name_kanji,
                      "image": character.images.jpg.image_url,
                      "description": character.about,
                      "url": `${window.location.origin}/character/${id}`,
                    })}
                  </script>
                </HelmetComponent>
                <div className="min-h-screen p-4 px-10 text-white bg-black">
                  <CharacterInfo character={character} />
                  <PicturesSection pictures={pictures} character={character} />
                  <VoiceActorsSection voices={voices} />
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

const CharacterInfo = ({ character }) => {
  return (
    <>
      <section className="container flex flex-col mx-auto lg:flex-row lg:space-x-8" aria-labelledby="character-info-heading">
        <div className="mb-8 lg:w-1/3 lg:mb-0">
          <img
            src={character.images.jpg.image_url}
            alt={`${character.name} - Character Portrait`}
            className="w-full mb-4 rounded-lg shadow-lg"
          />
        </div>
        <div className="space-y-4 lg:w-2/3">
          <h1 id="character-info-heading" className="text-4xl font-bold text-yellow-500">
            {character.name}
          </h1>
          {character.name_kanji && (
            <p className="text-xl font-bold text-gray-500">
              {character.name_kanji}
            </p>
          )}
          {character.about && (
            <p className="mb-4 text-lg text-gray-300 whitespace-pre-line">
              {character.about}
            </p>
          )}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {character.nicknames && character.nicknames.length > 0 && (
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-yellow-500">
                  Nicknames
                </h2>
                <ul className="space-y-1 list-disc list-inside">
                  {character.nicknames.map((nickname, index) => (
                    <li key={index}>{nickname}</li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h2 className="mb-2 text-2xl font-semibold text-yellow-500">
                Information
              </h2>
              <dl className="space-y-2">
                {character.favorites && (
                  <div>
                    <dt className="inline font-bold">Favorite By: </dt>
                    <dd className="inline">{character.favorites.toLocaleString()}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const PicturesSection = ({ pictures, character }) => {
  if (!pictures || pictures.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-8" aria-labelledby="pictures-heading">
      <h2 id="pictures-heading" className="text-2xl font-semibold text-yellow-500 mb-4">
        Character Pictures
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {pictures.map((pic, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={pic.jpg.image_url}
              alt={`${character?.name || 'Character'} - Picture ${index + 1}`}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

const VoiceActorsSection = ({ voices }) => {
  if (!voices || voices.length === 0) return null;

  return (
    <section className="container mx-auto py-8" aria-labelledby="voice-actors-heading">
      <h2 id="voice-actors-heading" className="text-2xl font-semibold text-yellow-500 mb-4">
        Voice Actors
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {voices.map((voice, index) => (
          <article key={index} className="flex items-center p-4 space-x-4 bg-gray-800 rounded-lg">
            <img
              src={voice.person.images.jpg.image_url}
              alt={`${voice.person.name} - Voice Actor`}
              className="object-cover w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-white">{voice.person.name}</h3>
              <p className="text-sm text-gray-400">{voice.language}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};