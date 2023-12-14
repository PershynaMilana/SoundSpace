import React, { useState, useEffect, useRef } from "react";
import { usePlayer } from "../services/PlayerContext";
import axios from "axios";
import getToken from "../configs/spotifyAuth";
import { useParams, useNavigate } from "react-router-dom";
import SearchContent from '../content/SearchContent'
const Search = () => {
    const { query } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [playlistResults, setPlaylistResults] = useState([]);
    const [artistResults, setArtistResults] = useState([]);
    const [albumResults, setAlbumResults] = useState([]);
    const [authorName, setAuthorName] = useState("");
    const [authorImage, setAuthorImage] = useState("");
    const [authorTracks, setAuthorTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [currentTab, setCurrentTab] = useState(0);
    const navigate = useNavigate();
    const { setTrack } = usePlayer();
    const audioPlayerRef = useRef(null);
    const [playlistIndex, setPlaylistIndex] = useState(0);
    const [albumIndex, setAlbumIndex] = useState(0);
    const [loading, setLoading] = useState(true);

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

    const searchArtist = async (query, accessToken) => {
        try {
            const response = await axios.get(
                "https://api.spotify.com/v1/search",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        q: query,
                        type: "artist",
                    },
                    withCredentials: false,
                }
            );

            const artists = response.data.artists.items;
            if (artists.length > 0) {
                return [artists[0]];
            } else {
                return [];
            }
        } catch (error) {
            console.error("Ошибка при поиске артиста:", error);
            throw error;
        }
    };

    const searchAlbums = async (query, accessToken) => {
        const response = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                q: query,
                type: "album",
            },
            withCredentials: false,
        });
        return response.data.albums.items;
    };

    const fetchData = async () => {
        const accessToken = await getToken();
        if (query) {
            const trackResults = await searchTracks(query, accessToken);
            const playlistResults = await searchPlaylists(query, accessToken);
            const artistResults = await searchArtist(query, accessToken);
            const albumResults = await searchAlbums(query, accessToken);

            setSearchResults(trackResults);
            setPlaylistResults(playlistResults);
            setArtistResults(artistResults);
            setAlbumResults(albumResults);

            if (artistResults.length > 0) {
                setAuthorName(artistResults[0].name);
                setAuthorImage(artistResults[0].images[0]?.url || "");
                const trackNames = trackResults.map((track) => track.name);
                setAuthorTracks(trackNames);
            }
            setLoading(false);
        }
    };

    const handleNextPlaylist = () => {
        setPlaylistIndex((prevIndex) => prevIndex + 7);
    };

    const handlePrevPlaylist = () => {
        setPlaylistIndex((prevIndex) => Math.max(0, prevIndex - 7));
    };

    const handleNextAlbum = () => {
        setAlbumIndex((prevIndex) => prevIndex + 7);
    };

    const handlePrevAlbum = () => {
        setAlbumIndex((prevIndex) => Math.max(0, prevIndex - 7));
    };

    useEffect(() => {
        fetchData();
    }, [query]);

    const handleArtistClick = (artistId) => {
        navigate(`/artist/${artistId}`);
    };

    const handlePlaylistClick = (playlistId) => {
        navigate(`/playlist/${playlistId}`);
    };

    const handleAlbumClick = (albumId) => {
        navigate(`/album/${albumId}`);
    };

    const playTrack = (track) => {
        setTrack(track);
    };

    useEffect(() => {
        if (audioPlayerRef && audioPlayerRef.current) {
            audioPlayerRef.current.src = currentTrack?.preview_url || "";
        }
    }, [currentTrack, audioPlayerRef]);

    return (
        <SearchContent
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          query={query}
          artistResults={artistResults}
          authorName={authorName}
          authorImage={authorImage}
          searchResults={searchResults}
          playlistResults={playlistResults}
          handleArtistClick={handleArtistClick}
          playTrack={playTrack}
          playlistIndex={playlistIndex}
          handlePrevPlaylist={handlePrevPlaylist}
          handleNextPlaylist={handleNextPlaylist}
          loading={loading}
          albumResults={albumResults}
          handlePrevAlbum={handlePrevAlbum}
          handleNextAlbum={handleNextAlbum}
          albumIndex={albumIndex}
          handlePlaylistClick={handlePlaylistClick}
          handleAlbumClick={handleAlbumClick}
        />
      );
    };

export default Search;
