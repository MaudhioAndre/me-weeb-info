import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import HelmetComponent from "../components/HelmetComponent";
import LoadingComp from "../components/LoadingComp";
import TruncateTitle from "../components/TruncateTitle";
import Logs from "../components/log/Logs";
import { UserContext } from "../components/Global";
import Header from "../components/Header";
import Footer from "../components/Footer";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function SearchPage() {
  const query = useQuery();
  const searchQuery = query.get("q");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(false);
  const { user } = useContext(UserContext);

  console.log(searchResults);

  useEffect(() => {
    Logs(setContent, user);

    const fetchSearchResults = async () => {
      if (!searchQuery) {
        return;
      }

      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${searchQuery}`
        );
        const data = await response.json();
        if (data.data) {
          setSearchResults(data.data);
        }
      } catch (err) {
        console.log("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery, user]);

  return (
    <>
      {content && (
        <>
          <Header />
          <main className="main-content">
            <HelmetComponent
              title={`MeWeeb | Search Results ${searchQuery} | Anime Search`}
              keyword={
                "Anime, Anime Info, Anime Wiki, Anime Detail, Anime Synopsis, Anime Information, Anime Trailer"
              }
              description={`Anime Search`}
            />

            <div className="p-4 text-white">
              {loading ? (
                <LoadingComp />
              ) : (
                <div>
                  <h1 className="my-8 text-3xl font-bold text-center text-white">
                    Search Results for "{searchQuery}"
                  </h1>
                  <div className="grid min-h-screen grid-cols-1 gap-8 px-5 pt-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    {searchResults.map((anime, index) => (
                      <Link
                        to={`/anime/${anime.mal_id}`}
                        key={anime.mal_id}
                        className="relative overflow-hidden bg-transparent rounded-lg shadow-md"
                      >
                        <img
                          src={anime.images.webp.image_url}
                          alt={anime.title}
                          className="object-cover object-center w-full lg:h-64 h-96"
                        />
                        <div className="absolute bottom-0 left-0 right-0 py-2 text-center text-white bg-black bg-opacity-80">
                          <h3 className="text-base font-semibold">
                            <span className="text-red-500">
                              {`${index < 9 ? "0" : ""}${index + 1}`}
                            </span>
                            {` ${TruncateTitle(anime.title, 14)}`}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
