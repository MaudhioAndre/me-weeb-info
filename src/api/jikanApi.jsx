import axios from 'axios';

export const API_URL = 'https://api.jikan.moe/v4';

export const fetchTopAnime = () => axios.get(`${API_URL}/top/anime`);
export const fetchTopCharacters = () => axios.get(`${API_URL}/top/characters`);
export const fetchRecomendationsAnime = () => axios.get(`${API_URL}/recommendations/anime`);
export const fetchTopManga = () => axios.get(`${API_URL}/top/manga`);
export const fetchRandomAnime = () => axios.get(`${API_URL}/random/anime`);