import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          "https://api.jikan.moe/v4/recommendations/anime"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setRecommendations(data.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, []);

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength - 3) + "...";
    }
    return title;
  };

  return (
    <>
      <center>
        <h2>
          <b>Anime & Manga Recommendations</b>
        </h2>
      </center>
      <br />
      <br />
      <br />

      <div className="div_contain_anime_rec">
        {recommendations &&
          recommendations.map((recommendation) => (
            <div>
              Recommended by &nbsp;
              <a href={recommendation.user.url}>
                {recommendation.user.username}
              </a>
              &nbsp; on {new Date(recommendation.date).toLocaleDateString()}
              
              <div className="div_anime_recommendations">
                {recommendation.entry.map((anime) => (
                  <Link
                    to={`/anime/${anime.mal_id}`}
                    key={anime.mal_id}
                    className="card_anime_recommend"
                  >
                    <div
                      className="img_content"
                      style={{
                        backgroundImage: `url(${anime.images.jpg.image_url})`,
                      }}
                    >
                      <div>{` ${truncateTitle(anime.title, 14)}`}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
