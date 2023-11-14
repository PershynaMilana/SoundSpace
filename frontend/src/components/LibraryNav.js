import React from "react";
import { Link } from "react-router-dom";
 
const LibraryNav = () => {
  return (
    <div className="library-container">
      <div className="library-nav">
        <Link to="/library/overview">Overview</Link>
        <Link to="/library/likes">Likes</Link>
        <Link to="/library/sets">Playlists</Link>
      </div>
    </div>
  );
};
 
export default LibraryNav;
 