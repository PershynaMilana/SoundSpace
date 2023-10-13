<<<<<<< HEAD
import React, { useState } from 'react';
import axios from 'axios';
import getToken from './spotifyAuth'; 
import './styles/searchMusicStyles.css';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playlistResults, setPlaylistResults] = useState([]);

  const searchTracks = async (query) => {
    const accessToken = await getToken();
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      params: {
        q: query,
        type: 'track',
      },
      withCredentials: false,
    });
    return response.data.tracks.items;
  };

  const searchPlaylists = async (query) => {
    const accessToken = await getToken();
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      params: {
        q: query,
        type: 'playlist',
      },
      withCredentials: false,
    });
    return response.data.playlists.items;
  };

  const handleSearch = async () => {
    const trackResults = await searchTracks(searchQuery);
    const playlistResults = await searchPlaylists(searchQuery);
    setSearchResults(trackResults);
    setPlaylistResults(playlistResults);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for music"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        <h2>Tracks</h2>
        <ul className="track-list">
          {searchResults.map((track) => (
            <li key={track.id} className="track-item">
              <p className="track-name">{track.name}</p>
              <p className="artist-name">by {track.artists[0].name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Playlists</h2>
        <ul className="playlist-list">
          {playlistResults.map((playlist) => (
            <li key={playlist.id} className="playlist-item">
              <p className="playlist-name">{playlist.name}</p>
              <p className="owner-name">by {playlist.owner.display_name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
=======
import React, { useState, useEffect } from "react";
import axios from "axios";
import getToken from "./spotifyAuth";
import { useParams } from "react-router-dom";

const Search = () => {
    const { query } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [playlistResults, setPlaylistResults] = useState([]);
    const searchTracks = async (query) => {
        const accessToken = await getToken();
        const response = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                q: query,
                type: "track",
            },
            withCredentials: false,
        });
        return response.data.tracks.items;
    };

    const searchPlaylists = async (query) => {
        const accessToken = await getToken();
        const response = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                q: query,
                type: "playlist",
            },
            withCredentials: false,
        });
        return response.data.playlists.items;
    };
    useEffect(() => {
        if (query) {
            const search = async () => {
                const trackResults = await searchTracks(query);
                const playlistResults = await searchPlaylists(query);

                setSearchResults(trackResults);
                setPlaylistResults(playlistResults);
            };

            search();
        }
    }, [query]);

    return (
        <div>
            <div>
                <h1>Search Results for: {query}</h1>
            </div>

            <div>
                <h2>Tracks</h2>
                <ul className="track-list">
                    {searchResults.map((track) => (
                        <li key={track.id} className="track-container">
                            <img
                                src={track.album.images[0].url} 
                                alt={track.name}
                                className="track-image"
                            />
                            <div className="track-info">
                                <p className="track-name">{track.name}</p>
                                <p className="artist-name">
                                    by {track.artists[0].name}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Playlists</h2>
                <ul className="playlist-list">
                    {playlistResults.map((playlist) => (
                        <li key={playlist.id} className="playlist-item">
                            <p className="playlist-name">{playlist.name}</p>
                            <p className="owner-name">
                                by {playlist.owner.display_name}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
>>>>>>> eb59dc3 (Seventh commit)
};

export default Search;
