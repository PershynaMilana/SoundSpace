import React from "react";

const SearchResults = ({ results }) => {
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <p>{result.name}</p>
            <p>{result.artist}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
