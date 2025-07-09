// src/components/FeaturedMovies.js
import React, { useEffect, useState } from "react";
import MovieList from "./MovieList";
import axios from "axios";

// TMDB ID 리스트 (직접 지정)
const FEATURED_IDS = [
  479718,  // 추가된 영화1 (예: The Gentlemen)
  911430, // 추가된 영화2 (예: Dune: Part Two)
  857,     // 라이언 일병 구하기
  13,      // 포레스트 검프
  954,     // 미션 임파서블
  530385,  // 미드소마
  24428,   // 어벤져스1
  807,     // 세븐
  278,     // 쇼생크 탈출
  37165,   // 트루먼 쇼
  128,     // 모노노케 히메
  550      // 파이트 클럽
];

export default function FeaturedMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        // 여러 영화 상세정보를 병렬로 요청
        const requests = FEATURED_IDS.map(id =>
          axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: {
              api_key: process.env.REACT_APP_TMDB_KEY,
              language: "ko-KR"
            },
          })
        );
        const responses = await Promise.all(requests);
        setMovies(responses.map(res => res.data));
      } catch (e) {
        setMovies([]);
      }
    }
    fetchMovies();
  }, []);

  return <MovieList movies={movies} />;
}
