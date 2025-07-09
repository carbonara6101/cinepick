import React from 'react';
import './MovieCard.css';
import placeholder from './placeholder.jpg'


function MovieCard({ id, title, year, posterPath, onClick }) {
  const src = posterPath
    ? `https://image.tmdb.org/t/p/w300${posterPath}`
    : placeholder;

  return (
    <div className="movie-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : undefined }}>
      <img src={src} alt={title} />
      <h3>{title}</h3>
      <p>{year}</p>
    </div>
  );
}
export default MovieCard;
