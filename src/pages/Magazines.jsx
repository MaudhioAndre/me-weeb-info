import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Magazines() {
  const [magazines, setMagazines] = useState([]);
  console.log(magazines);

  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        const response = await axios.get("https://api.jikan.moe/v4/magazines");
        setMagazines(response.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchMagazines();
  }, []);

  return (
    <>
      <center>
        <h2>
          <b>Magazines</b>
        </h2>
      </center>
      <br />
      <br />
      <br />
      <div className="div_c_magazine">
        {magazines && magazines.map((magazine) => (
          <a href={magazine.url} target="_blank">{magazine.name}</a>
        ))}
      </div>
    </>
  );
}
