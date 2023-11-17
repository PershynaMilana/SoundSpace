import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { clientId, clientSecret } from "../services/spotifyAuth";
import PlaylistContent from "../assets/content/PlaylistContent";

const Playlist = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null);
  const navigate = useNavigate();

  const playPauseTrack = (track) => {
    const audioPlayer = document.getElementById("audio-player");
    if (currentTrack === track) {
      audioPlayer.pause();
      setCurrentTrack(null);
    } else {
      audioPlayer.src = track.preview_url;
      audioPlayer.play();
      setCurrentTrack(track);
    }
  };

  useEffect(() => {
    const audioPlayer = document.getElementById("audio-player");
    audioPlayer.addEventListener("ended", () => {
      setCurrentTrack(null);
    });

    return () => {
      audioPlayer.removeEventListener("ended", () => {
        setCurrentTrack(null);
      });
    };
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const handleRowHover = (index) => {
    const playIcons = document.getElementsByClassName("playIcon");
    const customTableCells = document.getElementsByClassName("customTableCell");
    for (let i = 0; i < playIcons.length; i++) {
      playIcons[i].style.visibility = i === index ? "visible" : "hidden";
      customTableCells[i].style.visibility = i === index ? "hidden" : "visible";
    }
  };

    useEffect(() => {
        if (playlistId) {
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

            const getPlaylistInfo = async (token) => {
                try {
                    const response = await axios.get(
                        `https://api.spotify.com/v1/playlists/${playlistId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            withCredentials: false,
                        }
                    );
                    return response.data;
                } catch (error) {
                    console.error(
                        "Ошибка при получении информации о плейлисте:",
                        error
                    );
                    return null;
                }
            };

            const getPlaylistTracks = async (token) => {
                try {
                    const response = await axios.get(
                        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            withCredentials: false,
                        }
                    );
                    return response.data.items;
                } catch (error) {
                    console.error(
                        "Ошибка при получении треков плейлиста:",
                        error
                    );
                    return [];
                }
            };

            const fetchData = async () => {
                const token = await getToken();
                if (token) {
                    const playlistInfo = await getPlaylistInfo(token);
                    const playlistTracks = await getPlaylistTracks(token);
                    setPlaylist(playlistInfo);
                    setTracks(playlistTracks);
                    setLoading(false);
                }
            };
            fetchData();
        }
        return () => {
            document.body.style.background = "";
        };
    }, [playlistId]);

    return (
        <PlaylistContent
          loading={loading}
          playlist={playlist}
          tracks={tracks}
          playPauseTrack={playPauseTrack}
          handleRowHover={handleRowHover}
          goBack={goBack}
        />
      );
    };
    
    export default Playlist;
