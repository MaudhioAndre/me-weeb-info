import React, { useState } from "react";

import { Link } from "react-router-dom";

import "../assets/style/header.scss";

export default function Header() {
  const [topNavStat, setTopNavStat] = useState("topnav");

  const toggle = () => {
    console.log("toggle");
    if (topNavStat === "topnav") {
      setTopNavStat("topnav responsive");
    } else {
      setTopNavStat("topnav");
    }
  };

  return (
    <div class={topNavStat}>
      <a className="web_name" href="/">
        <span className="text_gradient">M</span>e
        <span className="text_gradient">W</span>eeb
      </a>
      <div className="div_menu_search">
        <div>
          <Link to="/all/anime">Anime</Link>
          <Link to="/all/manga">Manga</Link>
          <Link to="/all/characters">Characters</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/recommendations">Recommendations</Link>
          <Link to="/magazines">Magazines</Link>
          <Link to="/clubs">Clubs</Link>
        </div>
        <div>
          <input
            type="text"
            className="search_home"
            placeholder="Search Anime..."
          />
          <a href="javascript:void(0);" class="icon" onClick={() => toggle()}>
          <img src={require("../assets/img/icon/layout.png")} alt="drawer-icon" />
        </a>
        </div>
        
      </div>
      
    </div>
  );
}
