import React, { useState } from "react";
import { Link } from "react-router-dom";

const LibraryNav = () => {
  const [activeLink, setActiveLink] = useState("/library/overview");

  return (
    <div className="library-container">
      <div className="library-nav">
        <Link
          to="/library/overview"
          className={activeLink === "/library/overview" ? "active" : ""}
          onMouseEnter={() => setActiveLink("/library/overview")}
          onMouseLeave={() => setActiveLink("")}
          style={{ color: activeLink === "/library/overview" || activeLink === "" ? "white" : "grey", transition: "color 0.5s ease", }}
        >
          Overview
        </Link>
        <Link
          to="/library/likes"
          className={activeLink === "/library/likes" ? "active" : ""}
          onMouseEnter={() => setActiveLink("/library/likes")}
          onMouseLeave={() => setActiveLink("")}
          style={{ color: activeLink === "/library/likes" || activeLink === "" ? "white" : "grey", transition: "color 0.5s ease", }}
        >
          Likes
        </Link>
        <Link
          to="/library/sets"
          className={activeLink === "/library/sets" ? "active" : ""}
          onMouseEnter={() => setActiveLink("/library/sets")}
          onMouseLeave={() => setActiveLink("")}
          style={{ color: activeLink === "/library/sets" || activeLink === "" ? "white" : "grey", transition: "color 0.5s ease",}}
        >
          Playlists
        </Link>
      </div>
    </div>
  );
};

export default LibraryNav;
