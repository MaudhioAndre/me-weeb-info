import React, { useState, useEffect } from "react";

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
      <center>
        <h2>
          <b>Clubs</b>
        </h2>
      </center>
      <br />
      <br />
      <br />
      <div className="div_c_reviews">
        {reviews &&
          reviews.map((review, index) => (
            <div className="div_card_reviews">
              <img
                src={review.images.jpg.image_url}
                alt={review.name}
                className="img_reviews"
              />
              <div>
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
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
