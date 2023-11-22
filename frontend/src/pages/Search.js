import React, { useState, useEffect, useRef } from "react";
import { usePlayer } from "../services/PlayerContext";
import axios from "axios";
import getToken from "../services/spotifyAuth";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Tabs,
    Tab,
    Divider
} from "@mui/material";
import { styled } from "@mui/system";
import PlaylistTab from "../assets/tabs/SearchPageTabs/PlaylistTab"
import AlbumTab from "../assets/tabs/SearchPageTabs/AlbumTab";
import TrackTab from "../assets/tabs/SearchPageTabs/TrackTab";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const ContainerStyled = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
   
}));

const CardStyled = styled(Card)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "100%",
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
    marginLeft: "20px",
    marginRight: "20px",
}));

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
    const [selectedTab, setSelectedTab] = useState("albums");
    const navigate = useNavigate();
    const { setTrack } = usePlayer();
    const audioPlayerRef = useRef(null);

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
        }
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
        <ContainerStyled style={{ marginLeft: "150px" }}>
            <Tabs
                value={currentTab}
                onChange={(event, newValue) => setCurrentTab(newValue)}
                variant="fullWidth"
                textColor="primary"
                indicatorColor="primary"
                sx={{
                    justifyContent: "flex-start",
                    marginLeft: "80px",
                    "& .MuiTabs-indicator": {
                        backgroundColor: "transparent",
                    },
                    "& .MuiTab-root": {
                        textTransform: "none",
                        fontFamily: "Verdana",
                        color: "white",
                        borderRadius: "50px",
                        padding: "10px 20px",
                        margin: "5px",
                        fontWeight: "600",
                    },
                    "& .Mui-selected": {
                        backgroundColor: "#333333",
                        color: "white",
                    },
                }}
            >
                <Tab label="Контент страницы" />
                <Tab label="Плейлисты исполнителя" />
                <Tab label="Альбомы исполнителя" />
                <Tab label="Треки исполнителя" />
            </Tabs>
            <Divider style={{ margin: "15px 0", background: "#555" }}/>
            {currentTab === 0 && query && (
                <div
                    style={{
                        fontWeight: "500",
                        display: "flex",
                        flexWrap: "wrap",
                        color: "white",
                        fontFamily: "Lato",
                    }}
                >
                    <div>
                        <Typography
                            variant="h5"
                            gutterBottom
                            style={{ color: "white", fontWeight: "600" }}
                        >
                            Лучший результат
                        </Typography>
                        {artistResults.map((artist) => (
                            <div
                                class="divAuth"
                                style={{
                                    fontWeight: "500",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    borderRadius: "5px",
                                    height: "292px",
                                    marginTop: "40px",
                                    width: "500px",
                                    backgroundColor: "#212121",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "#333333";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "#212121";
                                }}
                                onClick={() => handleArtistClick(artist.id)}
                            >
                                <div>
                                    {artistResults.map((artist) => (
                                        <div
                                            key={artist.id}
                                            className="playlist-item"
                                            style={{
                                                width: "250px",
                                                height: "250px",
                                                borderRadius: "10px",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                margin: "10px",
                                            }}
                                            onClick={() =>
                                                handleArtistClick(artist.id)
                                            }
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
                                                        borderRadius: "100px",
                                                        marginRight: "60px",
                                                        marginTop: "15px",
                                                    }}
                                                />
                                            )}
                                            <Typography
                                                variant="h4"
                                                style={{
                                                    textAlign: "center",
                                                    fontWeight: "700",
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    color: "white",
                                                    marginTop: "10px",
                                                }}
                                            >
                                                {authorName}
                                            </Typography>
                                            <div
                                                style={{
                                                    width: "130px",
                                                    maxHeight: "30px",
                                                    height: "100%",
                                                    background: "#1a1a1a",
                                                    fontWeight: "500",
                                                    borderRadius: "100px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    marginTop: "10px",
                                                    marginRight: "65px",
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    style={{
                                                        color: "white",
                                                        fontSize: "14px",
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    Исполнитель
                                                </Typography>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <Typography
                            variant="h5"
                            style={{
                                color: "white",
                                alignContent: "left",
                                marginLeft: "30px",
                                marginBottom: "30px",
                                fontWeight: "600",
                            }}
                        >
                            Треки
                        </Typography>
                        <ul
                            className="track-list"
                            style={{
                                paddingLeft: "0",
                                width: "620px",
                                marginLeft: "30px",
                            }}
                        >
                            {searchResults.slice(0, 4).map((track) => (
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
                                                textAlign: "left",
                                                marginLeft: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {track.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            style={{
                                                textAlign: "left",
                                                marginLeft: "15px",
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
                            width: "2500px",
                            margin: "0 auto",
                        }}
                    >
                        <Typography
                            variant="h5"
                            style={{
                                color: "white",
                                fontWeight: "600",
                                marginBottom: "30px",
                                padding: "0",
                                width: "1300px",
                                marginTop: "30px",
                            }}
                        >
                            Плейлисты
                        </Typography>
                        <div
                        className="playlist-list"
                        style={{ display: "flex", flexWrap: "wrap" }}
                    >
                        {playlistResults.slice(0, 5).map((playlist) => (
                            <div
                                key={playlist.id}
                                className="playlist-item"
                                style={{
                                    width: "200px",
                                    height: "250px",
                                    borderRadius: "10px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    margin: "10px",
                                }}
                                onClick={() => handlePlaylistClick(playlist.id)}
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
                    <div
                        style={{
                            color: "white",
                            fontFamily: "Verdana",
                            marginTop: "30px",
                            width: "100%",
                            fontWeight: "500",
                            padding: "0px",
                            width: "2500px",
                            margin: "0 auto",
                        }}
                    >
                        <Typography
                            variant="h5"
                            style={{
                                color: "white",
                                fontWeight: "600",
                                marginBottom: "30px",
                                padding: "0",
                                width: "1300px",
                                marginTop: "30px",
                            }}
                        >
                            Альбомы
                        </Typography>
                        <div
                            className="album-list"
                            style={{ display: "flex", flexWrap: "wrap" }}
                        >
                            {albumResults.slice(0,5).map((album) => (
                                <div
                                    key={album.id}
                                    className="album-item"
                                    style={{
                                        width: "200px",
                                        height: "250px",
                                        borderRadius: "10px",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        margin: "10px",
                                    }}
                                    onClick={() => handleAlbumClick(album.id)}
                                >
                                    {album.images[0] && (
                                        <CardStyled>
                                            <CardMediaStyled
                                                image={album.images[0].url}
                                                title={album.name}
                                            />
                                            <CardContent>
                                                <Typography
                                                    variant="h6"
                                                    component="div"
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {album.name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    by {album.artists[0].name}
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

            {currentTab === 1 && (
                <PlaylistTab playlistResults={playlistResults} handlePlaylistClick={handlePlaylistClick} />
            )}
            {currentTab === 2 && (
                <AlbumTab albumResults={albumResults} handleAlbumClick={handleAlbumClick} />
            )}

            {currentTab === 3 && (
            <TrackTab trackResults={searchResults} />
            )}
        </ContainerStyled>
    );
};

export default Search;
