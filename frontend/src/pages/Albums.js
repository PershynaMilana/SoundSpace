import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { clientId, clientSecret } from "../services/spotifyAuth";
import AlbumContent from "../content/AlbumContent";
import { usePlayer } from "../services/PlayerContext";

const Album = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null);
  const { setTrack } = usePlayer();
  const audioPlayerRef = useRef(null);

  useEffect(() => {
    if (albumId) {
      const getToken = async () => {
        try {
          const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            null,
            {
              params: {
                grant_type: "client_credentials",
              },
              auth: {
                username: clientId,
                password: clientSecret,
              },
              withCredentials: false,
            }
          );
          return response.data.access_token;
        } catch (error) {
          console.error("Ошибка при получении токена:", error);
          return null;
        }
      };

      const getAlbumInfo = async (token) => {
        try {
          const response = await axios.get(
            `https://api.spotify.com/v1/albums/${albumId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: false,
            }
          );
          return response.data;
        } catch (error) {
          console.error("Ошибка при получении информации об альбоме:", error);
          return null;
        }
      };

      const getAlbumTracks = async (token) => {
        try {
          const response = await axios.get(
            `https://api.spotify.com/v1/albums/${albumId}/tracks`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: false,
            }
          );
          return response.data.items;
        } catch (error) {
          console.error("Ошибка при получении треков альбома:", error);
          return [];
        }
      };

      const fetchData = async () => {
        const token = await getToken();
        if (token) {
          const albumInfo = await getAlbumInfo(token);
          const albumTracks = await getAlbumTracks(token);
          setAlbum(albumInfo);
          setTracks(albumTracks);
          setLoading(false);
        }
      };
      fetchData();
    }

    return () => {
      document.body.style.background = "";
    };
  }, [albumId]);

  const playTrack = (track) => {
    setTrack(track);
};

useEffect(() => {
    if (audioPlayerRef && audioPlayerRef.current) {
        audioPlayerRef.current.src = currentTrack?.preview_url || "";
    }
}, [currentTrack, audioPlayerRef]);

  const handleRowHover = (index) => {
    const playIcons = document.getElementsByClassName("playIcon");
    const customTableCells =
      document.getElementsByClassName("customTableCell");
    for (let i = 0; i < playIcons.length; i++) {
      playIcons[i].style.visibility = i === index ? "visible" : "hidden";
      customTableCells[i].style.visibility =
        i === index ? "hidden" : "visible";
    }
  };

  return (
    <AlbumContent
      loading={loading}
      album={album}
      tracks={tracks}
      handleRowHover={handleRowHover}
      playTrack={playTrack}
    />
  );
};


export default Album;
