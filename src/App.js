// src/App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import Home from "./components/Home";
import FeaturedMovies from "./components/FeaturedMovies";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function MainPage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  // 항상 빈 상태로 시작
  useEffect(() => {
    setMovies([]);
    setQuery("");
    console.log("TMDB_KEY ▶", process.env.REACT_APP_TMDB_KEY);
  }, []);

  const handleSearch = async (searchQuery) => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: {
            api_key: process.env.REACT_APP_TMDB_KEY,
            language: "ko-KR",
            query: searchQuery,
          },
        }
      );
      setMovies(res.data.results || []);
      setQuery(searchQuery);
    } catch (err) {
      console.error("API 호출 실패", {
        status: err.response?.status,
        data: err.response?.data,
      });
      setMovies([]);
    }
  };

  return (
    <div className="App">
      <h1 className="main-title">🎬 CinePick</h1>
      <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />
      {query.trim() ? (
        <MovieList movies={movies} />
      ) : (
        <>
          <h2 className="section-title">🔥 인기 영화</h2>
          <FeaturedMovies />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<MainPage />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

