import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import PopularMovies from "./PopularMovies";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <div className="homepage-bg" />
      <div className="homepage-content">
        <h1 className="main-title">🎬 CinePick</h1>

        <button className="homepage-btn" onClick={() => navigate("/search")}>영화 검색 바로가기</button>
      </div>
      <footer className="homepage-footer">
        &copy; {new Date().getFullYear()} Movie Search | Powered by TMDB | Made by YourName
      </footer>
    </div>
  );
}
