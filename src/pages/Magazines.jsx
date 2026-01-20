import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import HelmetComponent from "../components/HelmetComponent";
import LoadingComp from "../components/LoadingComp";
import Logs from "../components/log/Logs";
import { UserContext } from "../components/Global";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Magazines() {
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(false);
  const { user } = useContext(UserContext);

  console.log(magazines);

  useEffect(() => {
    Logs(setContent, user);
    const fetchMagazines = async () => {
      try {
        const response = await axios.get("https://api.jikan.moe/v4/magazines");
        setMagazines(response.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchMagazines();
  }, []);

  if (loading) <LoadingComp />;

  return (
    <>
      {content && (
        <>
          <Header />
          <main className="main-content">
            <HelmetComponent
              title="MeWeeb | Magazines"
              description="Obsessed with anime and manga? Fuel your fandom with our magazines! Packed with exclusive interviews, in-depth reviews, and eye-catching visuals, discover the latest news and trends surrounding your favorite characters and series."
              keyword="Anime, Manga, Anime & Manga Magazines"
            />

            <div className="min-h-screen px-6 py-12 text-white bg-black">
              <h1 className="mb-16 text-3xl font-bold text-center text-white">
                Magazines
              </h1>
              <ul className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {magazines.map((magazine) => (
                  <li
                    key={magazine.mal_id}
                    className="transition duration-300 bg-black border border-gray-700 rounded-lg shadow-md cursor-pointer hover:shadow-lg"
                  >
                    <div className="p-6">
                      <h2 className="mb-2 text-lg font-bold">
                        {magazine.name}
                      </h2>
                      <a
                        href={magazine.url}
                        target="_blank"
                        className="block text-blue-500 hover:underline"
                      >
                        {magazine.count}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}