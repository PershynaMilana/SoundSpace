import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LibraryNav = () => {
  const [activeLink, setActiveLink] = useState('/library/overview');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="library-container">
      <div className="library-nav">
        <Link
          to="/library/overview"
          className={activeLink === '/library/overview' ? 'active' : ''}
          onClick={() => handleLinkClick('/library/overview')}
          style={{
            backgroundColor: activeLink === '/library/overview' ? '#505050' : 'transparent',
            borderRadius: '50px',
            color: activeLink === '/library/overview' ? 'white' : '#c2c2c2',
            transition: 'color 0.5s ease, background-color 0.5s ease',
            padding: '10px',
          }}
        >
          Overview
        </Link>
        <Link
          to="/library/likes"
          className={activeLink === '/library/likes' ? 'active' : ''}
          onClick={() => handleLinkClick('/library/likes')}
          style={{
            backgroundColor: activeLink === '/library/likes' ? '#505050' : 'transparent',
            borderRadius: '50px',
            color: activeLink === '/library/likes' ? 'white' : '#c2c2c2',
            transition: 'color 0.5s ease, background-color 0.5s ease',
            padding: '10px',
          }}
        >
          Likes
        </Link>
        <Link
          to="/library/sets"
          className={activeLink === '/library/sets' ? 'active' : ''}
          onClick={() => handleLinkClick('/library/sets')}
          style={{
            backgroundColor: activeLink === '/library/sets' ? '#505050' : 'transparent',
            borderRadius: '50px',
            color: activeLink === '/library/sets' ? 'white' : '#c2c2c2',
            transition: 'color 0.5s ease, background-color 0.5s ease',
            padding: '10px',
          }}
        >
          Playlists
        </Link>
      </div>
    </div>
  );
};

export default LibraryNav;
