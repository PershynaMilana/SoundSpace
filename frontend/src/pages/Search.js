import React, { useState, useEffect } from "react";
import axios from "axios";
import getToken from "../services/spotifyAuth";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container,
    Card,
    CardMedia,
    CardContent,
    Typography,
} from "@mui/material";
import { styled } from "@mui/system";

const ContainerStyled = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
}));

const CardStyled = styled(Card)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "105%",
    backgroundColor: "#333333",
    color: "white",
    transition: "transform 0.2s",
    "&:hover": {
        transform: "scale(1.05)",
    },
}));

const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
    width: "100%",
    height: 0,
    paddingTop: "56.25%",
}));

const Search = () => {
    const { query } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [playlistResults, setPlaylistResults] = useState([]);
    const [authorName, setAuthorName] = useState("");
    const [authorImage, setAuthorImage] = useState("");
    const [authorTracks, setAuthorTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);
    const navigate = useNavigate();

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
            navigate(`/author/${authorName}`);
        }
    };

    const handlePlaylistClick = (playlistId) => {
        navigate(`/playlist/${playlistId}`);
    };

    const playTrack = (track) => {
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

    return (
        <ContainerStyled maxWidth="lg">
            {query && (
                <Typography
                    variant="h4"
                    gutterBottom
                    style={{ color: "white", fontWeight: "500" }}
                >
                    Results for - {query}
                </Typography>
            )}
            {query && (
                <div
                    style={{
                        fontWeight: "500",
                        display: "flex",
                        flexWrap: "wrap",
                        color: "white",
                        fontFamily: "Verdana",
                    }}
                >
                    <div
                        style={{
                            fontWeight: "500",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <Typography
                            variant="h5"
                            style={{
                                fontWeight: "500",
                                color: "white",
                                fontFamily: "Verdana",
                                width: "500px",
                            }}
                        >
                            Author:
                        </Typography>
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
                                marginTop: "30px",
                                borderRadius: "10px",
                                fontWeight: "500",
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
                                        fontWeight: "500",
                                    }}
                                />
                            )}
                            <Typography
                                variant="body1"
                                style={{ textAlign: "center" }}
                            >
                                {authorName}
                            </Typography>
                        </div>
                    </div>
                    <div>
                        <Typography
                            variant="h5"
                            style={{
                                color: "white",
                                fontFamily: "Verdana",
                                alignContent: "left",
                                marginLeft: "30px",
                                marginBottom: "30px",
                                fontWeight: "500",
                            }}
                        >
                            Tracks:
                        </Typography>
                        <ul
                            className="track-list"
                            style={{
                                paddingLeft: "0",
                                width: "620px",
                                marginLeft: "30px",
                            }}
                        >
                            {searchResults.slice(0, 5).map((track) => (
                                <li
                                    key={track.id}
                                    className="track-container"
                                    onClick={() => playTrack(track)}
                                >
                                    <img
                                        src={track.album.images[0]?.url}
                                        alt={track.name}
                                        className="track-image"
                                    />
                                    <div className="track-info">
                                        <Typography
                                            variant="body1"
                                            style={{
                                                textAlign: "center",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {track.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            style={{
                                                textAlign: "center",
                                                fontWeight: "500",
                                            }}
                                        >
                                            by {track.artists[0].name}
                                        </Typography>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div
                        style={{
                            color: "white",
                            fontFamily: "Verdana",
                            marginTop: "30px",
                            width: "100%",
                            fontWeight: "500",
                            padding: "0px",
                        }}
                    >
                        <Typography
                            variant="h5"
                            style={{
                                color: "white",
                                fontFamily: "Verdana",
                                fontWeight: "500",
                                marginBottom: "30px",
                                padding: "0",
                            }}
                        >
                            Playlists:
                        </Typography>
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

                                        borderRadius: "10px",
                                        alignItems: "center",
                                    }}
                                    onClick={() =>
                                        handlePlaylistClick(playlist.id)
                                    }
                                >
                                    {playlist.images[0] && (
                                        <CardStyled>
                                            <CardMediaStyled
                                                image={playlist.images[0].url}
                                                title={playlist.name}
                                            />
                                            <CardContent>
                                                <Typography
                                                    variant="h6"
                                                    component="div"
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {playlist.name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    by{" "}
                                                    {
                                                        playlist.owner
                                                            .display_name
                                                    }
                                                </Typography>
                                            </CardContent>
                                        </CardStyled>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <audio
                id="audio-player"
                controls
                style={{ position: "fixed", bottom: 0, left: 0, width: "100%" }}
            />
        </ContainerStyled>
    );
};

export default Search;