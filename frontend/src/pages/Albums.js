import React from "react";
import "../assets/styles/library.css"; 
import LibraryNav from "../components/LibraryNav";
const Albums = () => {
  return (
    <div>
      <div className="library-container">
        <div className="library-nav">
          <LibraryNav/>
        </div>
      </div>
      <h1>Albums Page</h1>
    </div>
  );
};

export default Albums;
