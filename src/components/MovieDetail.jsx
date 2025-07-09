import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./MovieDetail.css";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: process.env.REACT_APP_TMDB_KEY,
              language: "ko-KR",
              append_to_response: "credits"
            },
          }
        );
        setMovie(res.data);
      } catch (err) {
        setError("상세 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  if (loading) return <div style={{ padding: 40 }}>로딩 중...</div>;
  if (error) return <div style={{ padding: 40, color: 'red' }}>{error}</div>;
  if (!movie) return null;

  return (
    <div className="movie-detail-content">
      <div className="movie-detail-flex">
        <div className="movie-detail-poster-wrap">
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w400${movie.poster_path}` : "https://via.placeholder.com/220x330?text=No+Image"}
            alt={movie.title}
            className="movie-detail-poster"
            width={220}
            height={330}
          />
        </div>
        <div className="movie-detail-info">
          <button className="movie-detail-back-btn" onClick={() => navigate('/search')}>
            ← 뒤로가기
          </button>
          <h2>{movie.title}</h2>
          <div style={{ color: '#ccc', marginBottom: 8 }}>{movie.original_title} ({movie.release_date})</div>
          <div style={{ marginBottom: 12 }}>
            <b>평점:</b> {movie.vote_average} / 10 ({movie.vote_count}명)
          </div>
          <div style={{ marginBottom: 12 }}>
            <b>장르:</b> {movie.genres && movie.genres.map(g => g.name).join(', ')}
          </div>
          <div style={{ marginBottom: 12 }}>
            <b>상영시간:</b> {movie.runtime ? `${movie.runtime}분` : '-'}
          </div>
          <div style={{ marginBottom: 18 }}>
            <b>줄거리:</b>
            <div style={{ marginTop: 4 }}>{movie.overview || '줄거리 정보 없음'}</div>
          </div>
          {movie.credits && movie.credits.crew && (
            <div style={{ marginBottom: 12 }}>
              <b>감독:</b> {movie.credits.crew.filter(c => c.job === 'Director').map(d => d.name).join(', ') || '-'}
            </div>
          )}
          {movie.credits && movie.credits.cast && (
            <div style={{ marginBottom: 12 }}>
              <b>출연:</b> {movie.credits.cast.slice(0, 5).map(a => a.name).join(', ') || '-'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
