import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HelmetComponent from "../components/HelmetComponent";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function SearchPage() {
  const query = useQuery();
  const searchQuery = query.get("q");
  const [searchResults, setSearchResults] = useState([]);

  console.log(searchResults);

  useEffect(() => {
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
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <>
      <HelmetComponent
        title={`MeWeeb | Search Results ${searchQuery} | Anime Search`}
        keyword={
          "Anime, Anime Info, Anime Wiki, Anime Detail, Anime Synopsis, Anime Information, Anime Trailer"
        }
        description={`Anime Search`}
      />
      <center>
        <h2>
          <b>Search Results for "{searchQuery}"</b>
        </h2>
      </center>
      <br />
      <br />
      <section className="div_content">
        {searchResults &&
          searchResults.map((data, i) => (
            <Link to={`/anime/${data.mal_id}`}>
              <div
                className="img_content"
                style={{ backgroundImage: `url(${data.images.jpg.image_url})` }}
              >
                <h6>{data.title}</h6>
              </div>
            </Link>
          ))}
      </section>
    </>
  );
}
