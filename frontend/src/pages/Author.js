import React, { useEffect, useState, useCallback, useRef} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import getToken from "../services/spotifyAuth";
import AuthorContent from "../content/AuthorContent";
import { usePlayer } from "../services/PlayerContext";
import { useLikes } from "../services/LikesContext";

const Author = () => {
    const { artistId } = useParams();
    const [artist, setArtist] = useState(null);
    const [topTracks, setTopTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [displayedTracks, setDisplayedTracks] = useState(5);
    const [expanded, setExpanded] = useState(false);
    const { addToLikes } = useLikes(); 
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const { setTrack } = usePlayer();
    const audioPlayerRef = useRef(null);
    const [selectedTab, setSelectedTab] = useState("albums");
    const navigate = useNavigate();

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const goBack = () => {
        navigate(-1);
      };

    const searchRelatedArtists = async (artistId, token) => {
        try {
            if (artistId) {
                const response = await axios.get(
                    `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            limit: 10,
                        },
                        withCredentials: false,
                    }
                );
                return response.data.artists;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Ошибка при получении связанных артистов:", error);
            return [];
        }
    };

    const searchAlbumsByArtistId = async (artistId, token) => {
        try {
            if (artistId) {
                const response = await axios.get(
                    `https://api.spotify.com/v1/artists/${artistId}/albums`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            include_groups: "album",
                            limit: 10,
                        },
                        withCredentials: false,
                    }
                );
                return response.data.items;
            } else {
                return [];
            }
        } catch (error) {
            console.error(
                "Ошибка при получении альбомов по ID артиста:",
                error
            );
            return [];
        }
    };

    const getArtistInfo = async (artistId, token) => {
        try {
            const response = await axios.get(
                `https://api.spotify.com/v1/artists/${artistId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: false,
                }
            );
            return response.data;
        } catch (error) {
            console.error("Ошибка при получении информации об артисте:", error);
            return null;
        }
    };

    const getTopTracks = async (artistId, token) => {
        try {
            const response = await axios.get(
                `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: false,
                }
            );
            return response.data.tracks;
        } catch (error) {
            console.error("Ошибка при получении топ-треков артиста:", error);
            return [];
        }
    };

    const handleClick = useCallback(
        async (tabType, token) => {
            if (selectedTab !== tabType) {
                setSelectedTab(tabType);

                if (tabType === "albums" && artistId) {
                    const fetchedAlbums = await searchAlbumsByArtistId(
                        artistId,
                        token
                    );
                    setAlbums(fetchedAlbums);
                } else if (tabType === "artists" && artistId) {
                    const fetchedRelatedArtists = await searchRelatedArtists(
                        artistId,
                        token
                    );
                    setArtists(fetchedRelatedArtists);
                }
            }
        },
        [selectedTab, artistId]
    );

    useEffect(() => {
        const fetchDataEffect = async () => {
            const token = await getToken();
            if (token && artistId) {
                const artistInfo = await getArtistInfo(artistId, token);
                const artistTopTracks = await getTopTracks(artistId, token);
                setArtist(artistInfo);
                setTopTracks(artistTopTracks);
                setLoading(false);
                if (token && artistId && selectedTab === "albums") {
                    const fetchedAlbums = await searchAlbumsByArtistId(
                        artistId,
                        token
                    );
                    setAlbums(fetchedAlbums);
                    const fetchedRelatedArtists = await searchRelatedArtists(
                        artistId,
                        token
                    );
                    setArtists(fetchedRelatedArtists);
                    setLoading(false);
                }
            }
        };

        if (artistId) {
            fetchDataEffect();
        }
    }, [artistId, handleClick, selectedTab]);

    useEffect(() => {
        setSelectedTab("albums");
    }, [artistId]);

    const handleArtistClick = (artistId) => {
        navigate(`/artist/${artistId}`);
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

    const toggleTracks = () => {
        setExpanded(!expanded);
        if (expanded) {
            setDisplayedTracks(5);
        } else {
            setDisplayedTracks(topTracks.length);
        }
    };

    return (
        <AuthorContent
            loading={loading}
            artist={artist}
            topTracks={topTracks}
            displayedTracks={displayedTracks}
            handleRowHover={handleRowHover}
            playTrack={playTrack}
            expanded={expanded}
            toggleTracks={toggleTracks}
            selectedTab={selectedTab}
            albums={albums}
            artists={artists}
            handleAlbumClick={handleAlbumClick}
            handleArtistClick={handleArtistClick}
            handleTabChange={handleTabChange}
            handleClick={handleClick}
            goBack={goBack}
            addToLikes={addToLikes} 
        />
    );
};

export default Author;
