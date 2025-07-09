import { useState, useEffect } from "react";

const STORAGE_KEY = "favorite_movie_ids";

export default function useFavoriteMovies() {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const isFavorite = (id) => favoriteIds.includes(id);
  const addFavorite = (id) => setFavoriteIds((ids) => [...ids, id]);
  const removeFavorite = (id) => setFavoriteIds((ids) => ids.filter((fid) => fid !== id));
  const toggleFavorite = (id) => {
    isFavorite(id) ? removeFavorite(id) : addFavorite(id);
  };

  return { favoriteIds, isFavorite, addFavorite, removeFavorite, toggleFavorite };
}
