import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async () => {
        if (!searchQuery) return;

        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}`);
            const data = await response.json();
            if (data.data) {
                setError('');
                navigate(`/search?q=${searchQuery}`);
            } else {
                setError('No results found');
            }
        } catch (err) {
            setError('Failed to fetch data');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <header className="relative z-10 bg-transparent">
            <div className="flex items-center h-16 max-w-screen-xl gap-8 px-4 mx-auto sm:px-6 lg:px-0">
                <Link to="/" className="block text-2xl font-bold text-center text-white md:text-left">
                    <span className="sr-only">Home</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
                        M
                    </span>
                    e
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
                        W
                    </span>
                    eeb
                </Link>
                <div className="flex items-center justify-center flex-1 md:justify-between">
                    <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex items-center gap-6 text-sm">
                            <li>
                                <Link to="/all/anime" className="text-white transition hover:text-white/75" onClick={closeMenu}>
                                    Anime
                                </Link>
                            </li>
                            <li>
                                <Link to="/all/manga" className="text-white transition hover:text-white/75" onClick={closeMenu}>
                                    Manga
                                </Link>
                            </li>
                            <li>
                                <Link to="/all/characters" className="text-white transition hover:text-white/75" onClick={closeMenu}>
                                    Characters
                                </Link>
                            </li>
                            <li>
                                <Link to="/reviews" className="text-white transition hover:text-white/75" onClick={closeMenu}>
                                    Reviews
                                </Link>
                            </li>
                            <li>
                                <Link to="/recommendations" className="text-white transition hover:text-white/75" onClick={closeMenu}>
                                    Recommendations
                                </Link>
                            </li>
                            <li>
                                <Link to="/magazines" className="text-white transition hover:text-white/75" onClick={closeMenu}>
                                    Magazines
                                </Link>
                            </li>
                            <li>
                                <Link to="/clubs" className="text-white transition hover:text-white/75" onClick={closeMenu}>
                                    Clubs
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">
                            <div className="relative">
                                <label htmlFor="Search" className="sr-only">
                                    Search
                                </label>
                                <input
                                    type="text"
                                    id="Search"
                                    placeholder="Search Anime"
                                    className="w-full rounded-md text-white px-2 border bg-transparent border-gray-700 py-0.5 pe-10 shadow-sm sm:text-sm"
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                    onKeyPress={handleKeyPress}
                                />
                                <span className="absolute inset-y-0 grid w-10 end-0 place-content-center">
                                    <button type="button" className="text-gray-600 hover:text-gray-700" onClick={handleSearch}>
                                        <span className="sr-only">Search</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-4 h-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </div>
                        </div>

                        <button
                            className="block p-1 text-gray-600 transition bg-transparent border border-gray-600 rounded hover:text-gray-600/75 md:hidden"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            <span className="sr-only">Toggle menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} absolute top-full left-0 right-0 p-2 bg-black md:bg-transparent md:hidden`}>
                <div className="overflow-hidden rounded-lg shadow-md ring-1 ring-black ring-opacity-5">
                    <div className="px-5 py-4">
                        <Link
                            to="/all/anime"
                            className="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-gray-50"
                            onClick={() => {
                                closeMenu();
                            }}
                        >
                            Anime
                        </Link>
                        <Link
                            to="/all/manga"
                            className="block px-3 py-2 mt-1 text-base font-medium text-white rounded-md hover:bg-gray-50"
                            onClick={() => {
                                closeMenu();
                            }}
                        >
                            Manga
                        </Link>
                        <Link
                            to="/reviews"
                            className="block px-3 py-2 mt-1 text-base font-medium text-white rounded-md hover:bg-gray-50"
                            onClick={() => {
                                closeMenu();
                            }}
                        >
                            Reviews
                        </Link>
                        <Link
                            to="/recommendations"
                            className="block px-3 py-2 mt-1 text-base font-medium text-white rounded-md hover:bg-gray-50"
                            onClick={() => {
                                closeMenu();
                            }}
                        >
                            Recommendations
                        </Link>
                        <Link
                            to="/magazines"
                            className="block px-3 py-2 mt-1 text-base font-medium text-white rounded-md hover:bg-gray-50"
                            onClick={() => {
                                closeMenu();
                            }}
                        >
                            Magazines
                        </Link>
                        <Link
                            to="/clubs"
                            className="block px-3 py-2 mt-1 text-base font-medium text-white rounded-md hover:bg-gray-50"
                            onClick={() => {
                                closeMenu();
                            }}
                        >
                            Clubs
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
