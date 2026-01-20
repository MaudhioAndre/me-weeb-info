import React, { useState, useEffect, useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarKosong } from "@fortawesome/free-regular-svg-icons";

import Rating from "react-rating";

import HelmetComponent from "../components/HelmetComponent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingComp from "../components/LoadingComp";
import Logs from "../components/log/Logs";
import { UserContext } from "../components/Global";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(false);
  const { user } = useContext(UserContext);

  console.log(reviews);

  useEffect(() => {
    Logs(setContent, user);
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://api.jikan.moe/v4/reviews/anime");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
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
            <HelmetComponent
              title="MeWeeb | Anime & Manga Reviews"
              description="Dive into the world of anime and manga with insightful reviews that explore captivating stories, stunning visuals, and unforgettable characters. Discover must-watch shows and must-read comics, whether you're a seasoned otaku or a curious newcomer."
              keyword="Anime, Manga, Anime Info, Anime Information, Anime Reviews, Manga Reviews"
            />

            {loading ? (
              <LoadingComp />
            ) : (
              <div>
                <h1 className="px-5 my-8 text-3xl font-bold text-center text-white">
                  Anime & Manga Reviews
                </h1>
                <div className="grid grid-cols-1 gap-4 px-4 pt-16 pb-8 text-white bg-black reviews-container sm:grid-cols-2 md:grid-cols-3">
                  {reviews.map((review) => (
                    <div
                      key={review.mal_id}
                      className="flex items-start p-4 bg-black rounded-lg review-card"
                    >
                      <img
                        src={review.entry.images.jpg.large_image_url}
                        alt={review.entry.title}
                        className="flex-shrink-0 w-32 h-32 rounded-lg shadow-md"
                      />
                      <div className="flex-1 ml-4">
                        <div className="mb-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">
                              {review.entry.title}
                            </h3>
                          </div>
                          <p className="text-gray-300">
                            <strong>Tags: </strong>
                            {review.tags.join(", ")}
                          </p>
                          <p className="text-gray-300">
                            <strong>
                              Reviewed by{" "}
                              <a
                                className="text-blue-300"
                                href={review.user.url}
                              >
                                {review.user.username}
                              </a>
                            </strong>
                          </p>
                          <Rating
                            emptySymbol={
                              <FontAwesomeIcon
                                icon={faStarKosong}
                                style={{ color: "rgb(250 204 21)" }}
                              />
                            }
                            fullSymbol={
                              <FontAwesomeIcon
                                icon={faStar}
                                style={{ color: "rgb(250 204 21)" }}
                              />
                            }
                            onHover={(hover) => console.log(`hover ${hover}`)}
                            onChange={(hover) => console.log(`change ${hover}`)}
                            fractions={1}
                            initialRating={review.score}
                            readonly
                            start={0}
                            step={2}
                            stop={10}
                          />
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