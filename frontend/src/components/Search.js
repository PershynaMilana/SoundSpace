import React, { useState } from 'react';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?query=${query}`);
      const data = await response.json();
      setResults(data.items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Поиск музыки на Spotify"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Искать</button>
      <ul>
        {results.map((track) => (
          <li key={track.id}>{track.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
