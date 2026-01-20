import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import HelmetComponent from "../components/HelmetComponent";

import axios from "axios";
import { API_URL } from "../api/jikanApi";
import TruncateTitle from "../components/TruncateTitle";
import LoadingComp from "../components/LoadingComp";
import Logs from "../components/log/Logs";
import { UserContext } from "../components/Global";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ListMangaAll() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(false);
  const { user } = useContext(UserContext);

  console.log(animeList);

  useEffect(() => {
    Logs(setContent, user);
    const getData = () => {
      console.log("getData");
      axios
        .get(`${API_URL}/top/manga`)
        .then((response) => {
          console.log(response);
          setAnimeList(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getData();
  }, []);

  return (
    <>
      {content && (
        <>
          <Header />
          <main className="main-content">
            <HelmetComponent
              title="MeWeeb | Manga List"
              description="This webpage provides a list of Manga recommendations or a collection of your favorite Manga."
              keyword="Manga, Manga Info, Manga Wiki, Manga Information, Manga"
            />

            {loading ? (
              <LoadingComp />
            ) : (
              <div>
                <h1 className="my-8 text-3xl font-bold text-center text-white">
                  Manga List
                </h1>
                <div className="grid grid-cols-2 gap-8 px-5 pt-16 md:grid-cols-3 lg:grid-cols-6">
                  {animeList &&
                    animeList.map((manga, index) => (
                      <Link
                        to={`/manga/${manga.mal_id}`}
                        key={manga.mal_id}
                        className="relative overflow-hidden bg-transparent rounded-lg shadow-md"
                      >
                        <img
                          src={manga.images.jpg.image_url}
                          alt={manga.title}
                          className="object-cover object-center w-full lg:h-64 h-48"
                        />
                        <div className="absolute bottom-0 left-0 right-0 py-2 text-center text-white bg-black bg-opacity-80">
                          <h3 className="text-base font-semibold">
                            <span className="text-red-500">
                              {`${index < 9 ? "0" : ""}${index + 1}`}
                            </span>
                            {` ${TruncateTitle(manga.title, 14)}`}
                          </h3>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </main>
          <Footer />
        </>
      )}
    </>
  );
}