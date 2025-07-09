// src/components/MovieList.jsx
import React from 'react';
import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';
import './MovieList.css';

export default function MovieList({ movies }) {
  const navigate = useNavigate();
  if (!movies.length) {
    return <p className="no-results">검색된 영화가 없습니다.</p>;
  }

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          year={movie.release_date?.slice(0,4)}
          posterPath={movie.poster_path}
          onClick={() => navigate(`/movie/${movie.id}`)}
        />
      ))}
    </div>
  );
}
