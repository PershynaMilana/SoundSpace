import React from "react";

const LibraryNav = () => {
  return (
    <div className="library-container">
      <div className="library-nav">
        <a href="/library/overview">Overview</a>
        <a href="/library/likes">Likes</a>
        <a href="/library/sets">Playlists</a>
        <a href="/library/albums">Albums</a>
      </div>
    </div>
  );
};

export default LibraryNav;
