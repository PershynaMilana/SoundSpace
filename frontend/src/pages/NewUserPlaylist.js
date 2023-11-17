// NewUserPlaylist.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import PlaylistContent from "../assets/content/NewPlaylistContent";

const NewUserPlaylist = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token] = useState(localStorage.getItem("token"));
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
          }
        );
        setPlaylist(response.data);
      } catch (error) {
        console.error("Error loading playlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [playlistId, token]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <PlaylistContent
      loading={loading}
      playlist={playlist}
      goBack={goBack}
    />
  );
};

export default NewUserPlaylist;
