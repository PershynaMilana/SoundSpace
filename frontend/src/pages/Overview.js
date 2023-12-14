import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { usePlayer } from "../services/PlayerContext";
import "../assets/styles/library.css";
import { useLikes } from "../services/LikesContext";
import OverviewContent from "../content/OverviewContent";

const Overview = () => {
  const navigate = useNavigate();
  const { getLatestPlayedTracks } = usePlayer();
  const [latestTracks, setLatestTracks] = useState([]);
  const [userData, setUserData] = useState({ name: "" });
  const [token, setToken] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [updatedName, setUpdatedName] = useState("");
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { likedTracks, removeFromLikes } = useLikes();
  const { setTrack, currentTrack } = usePlayer();
  const audioPlayerRef = useRef(null);
  const lastFiveLikedTracks = likedTracks.slice(-5).reverse();

  useEffect(() => {
    const fetchLatestTracks = async () => {
      try {
        const tracks = await getLatestPlayedTracks();
        setLatestTracks(tracks);
      } catch (error) {
        console.error("Error fetching latest tracks:", error);
      }
    };

    fetchLatestTracks();
  }, [getLatestPlayedTracks]);


  useEffect(() => {
    if (audioPlayerRef && audioPlayerRef.current) {
      audioPlayerRef.current.src = currentTrack?.preview_url || "";
    }
  }, [currentTrack, audioPlayerRef]);

  useEffect(() => {
    const storedToken = getCookie("auth_token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      loadPlaylists();
      loadUserData();
    }
  }, [token]);

  const handleNextPlaylist = () => {
    setPlaylistIndex((prevIndex) => prevIndex + 6);
  };

  const handlePrevPlaylist = () => {
    setPlaylistIndex((prevIndex) => Math.max(0, prevIndex - 6));
  };

  const handleNextTrack = () => {
    setTrackIndex((prevIndex) => prevIndex + 6);
  };

  const handlePrevTrack = () => {
    setTrackIndex((prevIndex) => Math.max(0, prevIndex - 6));
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const loadPlaylists = async () => {
    try {
      const decodedToken = parseJwt(token);
      console.log("Decoded Token:", decodedToken);
      console.log("Token load playlist:", token);
      const response = await axios.get("http://localhost:8080/api/playlists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: decodedToken.id,
        },
      });
      setPlaylists(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading playlists:", error);
    }
  };

  const loadUserData = async () => {
    try {
      const storedToken = getCookie("auth_token");
      const decodedToken = parseJwt(token);
      console.log("Decoded Token:", decodedToken);
      console.log("Token load user data:", token);
      const response = await axios.get("http://localhost:8080/api/user", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      setUpdatedName(response.data.user.name);
      console.log("Updated Name:", response.data.user.name);
      setUserData(response.data.user);
    } catch (error) {
      console.error("Error loading user data:", error);
      console.log("Axios Error Details:", error.response);
    }
  };

  const handlePlaylistClick = (playlistId) => {
    navigate(`/newplaylist/${playlistId}`);
  };

  const handleTrackClick = (playlistId) => {
    navigate(`/album/${playlistId}`);
  };

  const handleRowClick = (track) => {
    setCurrentTrackId(track.id);
    setIsPlaying(currentTrackId === track.id ? !isPlaying : true);
    setTrack(track);
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(null);

  useEffect(() => {
    if (audioPlayerRef && audioPlayerRef.current) {
      audioPlayerRef.current.src = currentTrack?.preview_url || "";
    }
  }, [currentTrack, audioPlayerRef]);

  const handleRowHover = (index) => {
    const playIcons = document.getElementsByClassName(
      "playIcon" || "pauseIcon"
    );
    const customTableCells =
      document.getElementsByClassName("customTableCells");

    if (playIcons.length > index && customTableCells.length > index) {
      for (let i = 0; i < playIcons.length; i++) {
        playIcons[i].style.visibility = i === index ? "visible" : "hidden";
        customTableCells[i].style.visibility =
          i === index ? "hidden" : "visible";
      }
    }
  };

  return (
    <OverviewContent
      loading={loading}
      latestTracks={latestTracks}
      trackIndex={trackIndex}
      playlists={playlists}
      playlistIndex={playlistIndex}
      likedTracks={likedTracks}
      handlePrevTrack={handlePrevTrack}
      handleNextTrack={handleNextTrack}
      handlePrevPlaylist={handlePrevPlaylist}
      handleNextPlaylist={handleNextPlaylist}
      handleTrackClick={handleTrackClick}
      handlePlaylistClick={handlePlaylistClick}
      removeFromLikes={removeFromLikes}
      isPlaying={isPlaying}
      currentTrackId={currentTrackId}
      handleRowHover={handleRowHover}
      setTrack={setTrack}
      audioPlayerRef={audioPlayerRef}
      lastFiveLikedTracks={lastFiveLikedTracks}
      handleRowClick={handleRowClick}
    />
  );
};


export default Overview;
