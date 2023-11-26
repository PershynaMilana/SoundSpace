import React from "react";
import { Link } from "react-router-dom";
const linkStyle = {
    textDecoration: "none",
    color: "#9b9b9b",
    borderRadius: "50px",
    padding: "10px 20px",
    margin: "5px",
    fontWeight: "400",
    backgroundColor: "transparent",
};

const LibraryNav = () => {
    return (
        <div className="library-container">
            <div className="library-nav">
                <Link to="/library/overview" style={{linkStyle, color: "white",}}>Overview</Link>
                <Link to="/library/likes" style={{linkStyle, color: "white",}}>Likes</Link>
                <Link to="/library/sets" style={{linkStyle, color: "white",}}>Playlists</Link>
            </div>
        </div>
    );
};

export default LibraryNav;
