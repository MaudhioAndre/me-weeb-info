import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarKosong } from "@fortawesome/free-regular-svg-icons";

import Rating from "react-rating";

import { Helmet } from "react-helmet";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  console.log(reviews);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://api.jikan.moe/v4/reviews/anime");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const scoreToStars = (score) => {
    const maxStars = 5;
    const fullStars = Math.floor(score / 2);
    const halfStar = score % 2 === 1 ? 1 : 0;
    const emptyStars = maxStars - fullStars - halfStar;
    return {
      fullStars: fullStars,
      halfStar: halfStar,
      emptyStars: emptyStars,
    };
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MeWeeb | Anime & Manga Reviews</title>
        <meta name="robots" content="index,follow" />
        <meta
          name="keywords"
          content="Anime, Manga, Anime Info, Anime Information, Anime Reviews, Manga Reviews"
        />
        <meta
          name="description"
          content="Dive into the world of anime and manga with insightful reviews that explore captivating stories, stunning visuals, and unforgettable characters. Discover must-watch shows and must-read comics, whether you're a seasoned otaku or a curious newcomer."
        />
      </Helmet>
      <center>
        <h2>
          <b>Anime & Manga Reviews</b>
        </h2>
      </center>
      <br />
      <br />
      <br />
      <section className="div_c_reviews">
        {reviews &&
          reviews.map((review, index) => (
            <article className="div_card_reviews">
              <img
                src={review.entry.images.jpg.large_image_url}
                alt={review.entry.title}
                className="img_reviews"
              />
              <div>
                <h4 className="title_anime_review">{review.entry.title}</h4>
                <p className="desc_reviews">
                  <strong>Tags: </strong>
                  {review.tags.join(", ")}
                </p>
                <p className="desc_reviews">
                  <strong>
                    Reviewed by{" "}
                    <a className="text-blue-300" href={review.user.url}>
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
            </article>
          ))}
      </section>
    </>
  );
}
