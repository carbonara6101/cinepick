import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './SearchBar.css';

function SearchBar({ value, onChange, onSearch }) {
  const submit = e => {
    e.preventDefault();
    if (!value.trim()) return;
    onSearch(value);
  };

  return (
    <form className="search-bar" onSubmit={submit}>
      <span className="search-icon"><FiSearch /></span>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="영화 제목 입력"
        aria-label="영화 제목 입력"
      />
      <button type="submit">검색</button>
    </form>
  );
}

export default SearchBar;
