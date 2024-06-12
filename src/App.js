import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style/front.scss";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ListAnimeAll from "./pages/ListAnimeAll";
import ListCharacterAll from "./pages/ListCharacterAll";
import ListMangaAll from "./pages/ListMangaAll";
import DetailAnime from "./pages/DetailAnime";
import DetailManga from "./pages/DetailManga";
import DetailCharacters from "./pages/DetailCharacter";
import Reviews from "./pages/Reviews";
import Recommendations from "./pages/Recommendations";
import Magazines from "./pages/Magazines";
import Clubs from "./pages/Clubs";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/magazines" element={<Magazines />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/all/anime" element={<ListAnimeAll />} />
            <Route path="/all/manga" element={<ListMangaAll />} />
            <Route path="/all/characters" element={<ListCharacterAll />} />
            <Route path="/anime/:id" element={<DetailAnime />} />
            <Route path="/manga/:id" element={<DetailManga />} />
            <Route path="/characters/:id" element={<DetailCharacters />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

function NotFound() {
  return <h2>404 NOT FOUND</h2>;
}

export default App;
