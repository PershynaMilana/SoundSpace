import React from "react";
import "../assets/styles/library.css"; 
import LibraryNav from "../components/LibraryNav";
const Overview = () => {
  return (
    <div>
      <div className="library-container">
        <div className="library-nav">
          <LibraryNav/>
        </div>
      </div>
      <h1>Overview Page</h1>
    </div>
  );
};

export default Overview;
