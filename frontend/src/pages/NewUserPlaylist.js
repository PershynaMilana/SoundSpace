import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import PlaylistContent from "../content/NewPlaylistContent";
import getToken from "../configs/spotifyAuth";
import { usePlayer } from "../services/PlayerContext";
import { useLikes } from "../services/LikesContext";
import { app } from "../configs/fairbaseConfig";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
const NewUserPlaylist = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const { setTrack, currentTrack } = usePlayer();
  const { addToLikes } = useLikes(); 
  const audioPlayerRef = useRef(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const navigate = useNavigate();

  //! -------------------------------------------------- 


  const playTrack = (track) => {
    setTrack(track);
  };

  useEffect(() => {
    if (audioPlayerRef && audioPlayerRef.current) {
      audioPlayerRef.current.src = currentTrack?.preview_url || "";
    }
  }, [currentTrack, audioPlayerRef]);

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

  //! -------------------------------------------------- 


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

//! -------------------------------------------------- 

const fetchPlaylistTracks = async () => {
  const db = getFirestore(app);
  const tracksCollection = collection(db, `playlistTracks_${playlistId}`);
  const tracksSnapshot = await getDocs(tracksCollection);
  const tracksData = tracksSnapshot.docs.map((doc) => doc.data());
  setPlaylistTracks(tracksData);
};

const handleAddTrack = async (track) => {
  const db = getFirestore(app);
  if (!playlistTracks.some((t) => t.id === track.id)) {
    setPlaylistTracks((prevPlaylistTracks) => [...prevPlaylistTracks, track]);
    const tracksCollection = collection(db, `playlistTracks_${playlistId}`);
    await addDoc(tracksCollection, track);
  }
};

const removeFromPlaylist = async (trackId) => {
  const db = getFirestore(app);
  setPlaylistTracks((prevLikedTracks) =>
    prevLikedTracks.filter((likedTrack) => likedTrack.id !== trackId)
  );
  const tracksCollection = collection(db, `playlistTracks_${playlistId}`);
  const q = query(tracksCollection, where("id", "==", trackId));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
};

  return (
    <PlaylistContent
      loading={loading}
      playlist={playlist}
      searchTerm={searchTerm}
      searchResults={searchResults}
      searchLoading={searchLoading}
      addToLikes={addToLikes} 
      playlistId={playlistId}
      playlistTracks={playlistTracks}
      setPlaylistTracks={setPlaylistTracks}
      setSearchTerm={setSearchTerm}
      searchTracks={searchTracks}
      handleRowHover={handleRowHover}
      playPauseTrack={playTrack}
      fetchPlaylistTracks={fetchPlaylistTracks}
      handleAddTrack={handleAddTrack}
      removeFromPlaylist={removeFromPlaylist}
      goBack={goBack}
    />
  );
};

export default NewUserPlaylist;