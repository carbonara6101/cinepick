import React, { useEffect, useState } from "react";
import MovieList from "./MovieList";
import axios from "axios";

export default function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPopular() {
      try {
        setLoading(true);
        setError(null);
        // 인기영화 목록 가져오기
        const res = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          {
            params: {
              api_key: process.env.REACT_APP_TMDB_KEY,
              language: "ko-KR",
              page: 1
            },
          }
        );
        let results = res.data.results || [];
        // 'Status Quo'와 '나일 강의 죽음'을 id로 필터링(예시 id: 1239801, 664469)
        results = results.filter(m => m.id !== 1239801 && m.id !== 664469);
        // F1 더 무비와 범죄도시1 정보 fetch (id: 1111092, 505026)
        const [f1, outlaw] = await Promise.all([
          axios.get("https://api.themoviedb.org/3/movie/1111092", {
            params: {
              api_key: process.env.REACT_APP_TMDB_KEY,
              language: "ko-KR"
            }
          }),
          axios.get("https://api.themoviedb.org/3/movie/505026", {
            params: {
              api_key: process.env.REACT_APP_TMDB_KEY,
              language: "ko-KR"
            }
          })
        ]);
        // 맨 앞에 두 영화 추가
        setMovies([f1.data, outlaw.data, ...results.slice(0, 8)]); // 최대 10개만 보여줌
      } catch (e) {
        setError("인기 영화를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    }
    fetchPopular();
  }, []);

  if (loading) return <p>인기 영화를 불러오는 중...</p>;
  if (error) return <p style={{ color: "#e50914" }}>{error}</p>;
  return <MovieList movies={movies} />;
}
