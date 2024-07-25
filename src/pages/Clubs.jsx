import React, { useState, useEffect, useContext } from "react";

import { Helmet } from "react-helmet";
import LoadingComp from "../components/LoadingComp";
import Logs from "../components/log/Logs";
import { UserContext } from "../components/Global";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Clubs() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchReviews = async () => {
      Logs(setContent, user);
      try {
        const response = await fetch("https://api.jikan.moe/v4/clubs");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);
  return (
    <>
      {content && (
        <>
          <Header />
          <main className="main-content">
            <Helmet>
              <meta charSet="utf-8" />
              <title>MeWeeb | Anime & Manga Fanclubs</title>
              <meta name="robots" content="index,follow" />
              <meta
                name="keywords"
                content="Anime, Manga, Anime & Manga Fanclubs, Anime Fanclub, Manga Fanclub"
              />
              <meta
                name="description"
                content="Dive into the world of anime and manga! This fan club is your hub for all things otaku, connecting you with fellow fans to discuss your favorite shows, characters, and even cosplay adventures!"
              />
            </Helmet>

            {loading ? (
              <LoadingComp />
            ) : (
              <div>
                <h1 className="px-5 my-8 text-3xl font-bold text-center text-white">
                  Clubs
                </h1>
                <div className="grid grid-cols-1 gap-4 px-4 pt-16 pb-8 text-white bg-black reviews-container sm:grid-cols-2 md:grid-cols-3">
                  {reviews.map((review) => (
                    <div
                      key={review.mal_id}
                      className="flex items-start p-4 bg-black rounded-lg review-card"
                    >
                      <img
                        src={review.images.jpg.image_url}
                        alt={review.name}
                        className="flex-shrink-0 w-32 h-32 rounded-lg shadow-md"
                      />
                      <div className="flex-1 ml-4">
                        <div className="mb-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">
                              {review.name}
                            </h3>
                          </div>
                          <p className="text-gray-300">
                            <strong>Members: </strong>
                            {review.members}
                          </p>
                          <p className="text-gray-300">
                            <strong>
                              {" "}
                              Category{" "}
                              <a className="text-blue-300" href={review.url}>
                                {review.category}
                              </a>
                            </strong>
                          </p>
                        </div>
                      </div>
                    </div>
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
