import React, { useState, useEffect } from "react";

import { Helmet } from "react-helmet";

export default function Clubs() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://api.jikan.moe/v4/clubs");
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
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MeWeeb | Anime & Manga Fanclubs</title>
        <meta name="robots" content="index,follow" />
        <meta name="keywords" content="Anime, Manga, Anime & Manga Fanclubs, Anime Fanclub, Manga Fanclub" />
        <meta
          name="description"
          content="Dive into the world of anime and manga! This fan club is your hub for all things otaku, connecting you with fellow fans to discuss your favorite shows, characters, and even cosplay adventures!"
        />
      </Helmet>
      <center>
        <h2>
          <b>Clubs</b>
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
                src={review.images.jpg.image_url}
                alt={review.name}
                className="img_reviews"
              />
              <figure>
                <h4 className="title_anime_review">{review.name}</h4>
                <p className="desc_reviews">
                  <strong>Members: </strong>
                  {review.members}
                </p>
                <p className="desc_reviews">
                  <strong>
                    Category:&nbsp;
                    <a
                      className="text-blue-300"
                      href={review.url}
                      target="_blank"
                    >
                      {review.category}
                    </a>
                  </strong>
                </p>
              </figure>
            </article>
          ))}
      </section>
    </>
  );
}
