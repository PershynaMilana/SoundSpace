// NewUserPlaylist.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import PlaylistContent from "../content/NewPlaylistContent";
import getToken from "../services/spotifyAuth";

const NewUserPlaylist = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/playlists/${playlistId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: false,
          }
        );
        setPlaylist(response.data);
      } catch (error) {
        console.error("Error loading playlist:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchToken = async () => {
      try {
        const spotifyToken = await getToken();
        setToken(spotifyToken);
      } catch (error) {
        console.error("Error fetching Spotify token:", error);
      }
    };

    fetchPlaylist();
    fetchToken();
  }, [playlistId, token]);

  const goBack = () => {
    navigate(-1);
  };

  const searchTracks = async () => {
    try {

        setSearchLoading(true);
        const response = await axios.get(
            "https://api.spotify.com/v1/search",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    q: searchTerm,
                    type: "track",
                },
                withCredentials: false,
            }
        );
        setSearchResults(response.data.tracks.items);
    } catch (error) {
        console.error("Error searching tracks:", error);
    } finally {
        setSearchLoading(false);
    }
};


  return (
    <PlaylistContent
      loading={loading}
      playlist={playlist}
      goBack={goBack}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      searchResults={searchResults}
      searchLoading={searchLoading}
      searchTracks={searchTracks}
    />
  );
};

export default NewUserPlaylist;
