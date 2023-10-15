import React, { useState, useEffect } from "react";
import axios from "axios";
import getToken from "./spotifyAuth";
import { useParams } from "react-router-dom";

const Search = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [playlistResults, setPlaylistResults] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [authorImage, setAuthorImage] = useState("");
  const [authorTracks, setAuthorTracks] = useState([]);

  const searchTracks = async (query, accessToken) => {
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

  const searchPlaylists = async (query, accessToken) => {
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

  const searchAuthorId = async (authorName, accessToken) => {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: authorName,
        type: "artist",
        limit: 1,
      },
    });
    const artists = response.data.artists.items;
    if (artists.length > 0) {
      return artists[0].id;
    } else {
      return null;
    }
  };

  const fetchAuthorImage = async (authorId, accessToken) => {
    if (authorId) {
      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${authorId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const images = response.data.images;
      if (images.length > 0) {
        setAuthorImage(images[0].url);
      } else {
        setAuthorImage("");
      }
    } else {
      setAuthorImage("");
    }
  };

  const fetchData = async () => {
    const accessToken = await getToken();

    if (query) {
      const trackResults = await searchTracks(query, accessToken);
      const playlistResults = await searchPlaylists(query, accessToken);

      setSearchResults(trackResults);
      setPlaylistResults(playlistResults);

      if (trackResults.length > 0) {
        if (
          query.toLowerCase() === trackResults[0].name.toLowerCase()
        ) {
          setAuthorName(trackResults[0].artists[0].name);
          const authorId = await searchAuthorId(
            trackResults[0].artists[0].name,
            accessToken
          );
          await fetchAuthorImage(authorId, accessToken);
          const trackNames = trackResults.map((track) => track.name);
          setAuthorTracks(trackNames);
        } else {
          setAuthorName(query);
          setAuthorImage("");
        }
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  const handleAuthorClick = () => {
    if (authorName) {
      window.location.href = `/author/${authorName}`;
    }
  };

  const handlePlaylistClick = (playlist) => {
    if (playlist.name) {
      window.location.href = `/playlist/${playlist.name}`;
    }
  };

  return (
    <div>
      <div>
        <h1 style={{color: "white", fontFamily: "Verdana", margin: "20px"}}>Results for - {query}</h1>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", color: "white", fontFamily: "Verdana"}}>
        <div
          style={{
            width: "500px",
            height: "500px",
            cursor: "pointer",
            background: "gray",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "40px",
            borderRadius: "10px",
          }}
          onClick={handleAuthorClick}
        >
          {authorImage && (
            <img
              src={authorImage}
              alt={authorName}
              style={{
                width: "150px",
                height: "150px",
                background: "gray",
              }}
            />
          )}
          <p style={{ textAlign: "center" }}>{authorName}</p>
        </div>
        <div>
          <h2 style={{color: "white", fontFamily: "Verdana", marginLeft: "40px", width: "600px"}}>Tracks:</h2>
          <ul className="track-list">
            {searchResults.slice(0, 5).map((track) => (
              <li key={track.id} className="track-container">
                <img
                  src={track.album.images[0]?.url}
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
        <div style={{color: "white", fontFamily: "Verdana", marginLeft: "30px"}}>
          <h2 style={{color: "white", fontFamily: "Verdana"}}>Playlists:</h2>
          <div
            className="playlist-list"
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {playlistResults.map((playlist) => (
              <div
                key={playlist.id}
                className="playlist-item"
                style={{
                  width: "230px",
                  height: "250px",
                  margin: "10px",
                  background: "gray",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "10px",
                }}
                onClick={() => handlePlaylistClick(playlist)}
              >
                {playlist.images[0] && (
                  <img
                    src={playlist.images[0].url}
                    alt={playlist.name}
                    style={{
                      width: "150px",
                      height: "150px",
                      background: "gray",
                      margin: "10px",                      
                    }}
                  />
                )}
                <p style={{ textAlign: "center" }}>
                  {playlist.name}
                </p>
                <p style={{ textAlign: "center" }}>
                  by {playlist.owner.display_name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;