import React from "react";
import "../assets/styles/library.css"; 
import LibraryNav from "../components/LibraryNav";
const Likes = () => {
  return (
    <div>
      <div className="library-container">
        <div className="library-nav">
          <LibraryNav/>
        </div>
      </div>
      <h1>Likes Page</h1>
    </div>
  );
};

export default Likes;
