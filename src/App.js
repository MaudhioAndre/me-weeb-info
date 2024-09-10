import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/style/front.scss";

import Global from "./components/Global";
import Header from "./components/Header";
import Footer from "./components/Footer";

// import CodeSplitting from "./components/CodeSplitting.tsx";
// const Dashboard = CodeSplitting(() => import("./pages/Dashboard"));
// const ListAnimeAll = CodeSplitting(() => import("./pages/ListAnimeAll"));
// const ListCharacterAll = CodeSplitting(() => import("./pages/ListCharacterAll"));
// const ListMangaAll = CodeSplitting(() => import("./pages/ListMangaAll"));
// const DetailAnime = CodeSplitting(() => import("./pages/DetailAnime"));
// const DetailManga = CodeSplitting(() => import("./pages/DetailManga"));
// const DetailCharacters = CodeSplitting(() => import("./pages/DetailCharacter"));
// const Reviews = CodeSplitting(() => import("./pages/Reviews"));
// const Recommendations = CodeSplitting(() => import("./pages/Recommendations"));
// const Magazines = CodeSplitting(() => import("./pages/Magazines"));
// const Clubs = CodeSplitting(() => import("./pages/Clubs"));
// const SearchPage = CodeSplitting(() => import("./pages/SearchPage"));

import Dashboard from "./pages/Dashboard";
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
        <Global>
          <Routes>
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/" element={<Dashboard />}></Route>
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
        </Global>
      </Router>
    </>
  );
}

function NotFound() {
  return <h2>404 NOT FOUND</h2>;
}

export default App;
