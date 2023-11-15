import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { clientId, clientSecret } from "../services/spotifyAuth";
import {
    Container,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CircularProgress,
    IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const ContainerStyled = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
}));

const CardStyled = styled(Card)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
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

const Home = () => {
    const [popularPlaylists, setPopularPlaylists] = useState([]);
    const [artists, setArtists] = useState([]);
    const [newReleases, setNewReleases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [playlistIndex, setPlaylistIndex] = useState(0);
    const navigate = useNavigate();
    const [artistIndex, setArtistIndex] = useState(0);
    const [releaseIndex, setReleaseIndex] = useState(0);

    const handleNextArtist = () => {
        setArtistIndex((prevIndex) => prevIndex + 6);
    };

    const handlePrevArtist = () => {
        setArtistIndex((prevIndex) => Math.max(0, prevIndex - 6));
    };

    const handleNextRelease = () => {
        setReleaseIndex((prevIndex) => prevIndex + 6);
    };

    const handlePrevRelease = () => {
        setReleaseIndex((prevIndex) => Math.max(0, prevIndex - 6));
    };

    const handleNextPlaylist = () => {
        setPlaylistIndex((prevIndex) => prevIndex + 6);
    };

    const handlePrevPlaylist = () => {
        setPlaylistIndex((prevIndex) => Math.max(0, prevIndex - 6));
    };

    useEffect(() => {
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

        const getPopularPlaylists = async (token) => {
            try {
                const response = await axios.get(
                    "https://api.spotify.com/v1/browse/featured-playlists",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        withCredentials: false,
                    }
                );
                return response.data.playlists.items.slice(0, 20);
            } catch (error) {
                console.error(
                    "Ошибка при получении популярных плейлистов:",
                    error
                );
                return [];
            }
        };

        const getArtistInfo = async (token) => {
            try {
                const artistIds = [
                    "2CIMQHirSU0MQqyYHq0eOx",
                    "57dN52uHvrHOxijzpIgu3E",
                    "1vCWHaC5f2uS3yhpwWbIA6",
                    "3TVXtAsR1Inumwj472S9r4",
                    "1Xyo4u8uXC1ZmMpatF05PJ",
                    "0TnOYISbd1XYRBk9myaseg",
                ];
                const artistsInfoPromises = artistIds.map(async (artistId) => {
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
                });
                const artistsInfo = await Promise.all(artistsInfoPromises);
                return artistsInfo;
            } catch (error) {
                console.error(
                    "Ошибка при получении информации об артистах:",
                    error
                );
                return [];
            }
        };

        const getNewReleases = async (token) => {
            try {
                const response = await axios.get(
                    "https://api.spotify.com/v1/browse/new-releases",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        withCredentials: false,
                    }
                );
                return response.data.albums.items.slice(0, 6);
            } catch (error) {
                console.error("Ошибка при получении новых релизов:", error);
                return [];
            }
        };

        const fetchData = async () => {
            const token = await getToken();
            if (token) {
                const playlists = await getPopularPlaylists(token);
                const artistInfo = await getArtistInfo(token);
                const releases = await getNewReleases(token);

                setPopularPlaylists(playlists);
                setArtists(artistInfo);
                setNewReleases(releases);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <ContainerStyled>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    color={"white"}
                    style={{
                        order: "1",
                        fontWeight: "700",
                        fontFamily: "Verdana",
                        marginTop: "25px",
                    }}
                >
                    Популярные плейлисты
                </Typography>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        order: "2",
                    }}
                >
                    <IconButton
                        style={{
                            color: "white",
                            cursor: "pointer",
                            marginTop: "25px",
                        }}
                        onClick={handlePrevPlaylist}
                        disabled={playlistIndex === 0}
                    >
                        <ArrowBackIosNewRoundedIcon />
                    </IconButton>
                    <Link
                        onClick={() => navigate("/section")}
                        to="/section"
                        variant="outlined"
                        color="primary"
                        style={{
                            textDecoration: "none",
                            color: "white",
                            fontSize: "20px",
                            verticalAlign: "middle",
                            marginTop: "30px",
                            fontWeight: "600",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        Показать все
                    </Link>
                    <IconButton
                        style={{
                            color: "white",
                            marginTop: "25px",
                            cursor:
                                playlistIndex + 6 >= popularPlaylists.length
                                    ? "not-allowed"
                                    : "pointer",
                            opacity:
                                playlistIndex + 6 >= popularPlaylists.length
                                    ? 0.5
                                    : 1,
                        }}
                        onClick={handleNextPlaylist}
                        disabled={playlistIndex + 6 >= popularPlaylists.length}
                    >
                        <ArrowForwardIosRoundedIcon />
                    </IconButton>
                </div>
            </div>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "15px",
                    }}
                >
                    <CircularProgress style={{ color: "gray" }} />
                </div>
            ) : (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {popularPlaylists
                        .slice(playlistIndex, playlistIndex + 6)
                        .map((playlist) => (
                            <CardStyled
                                key={playlist.id}
                                onClick={() =>
                                    navigate(`/playlist/${playlist.id}`)
                                }
                                style={{
                                    flex: "0 0 calc(16.666% - 20px)",
                                    margin: "10px",
                                    backgroundColor: "#222222",
                                    height: "220px",
                                    cursor: "pointer",
                                    color: "white",
                                }}
                            >
                                <CardMediaStyled
                                    image={playlist.images[0].url}
                                    title={playlist.name}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {playlist.name}
                                    </Typography>
                                </CardContent>
                            </CardStyled>
                        ))}
                </div>
            )}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    color={"white"}
                    style={{
                        order: "1",
                        fontWeight: "700",
                        fontFamily: "Verdana",
                        marginTop: "25px",
                    }}
                >
                    Популярные артисты
                </Typography>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        order: "2",
                    }}
                >
                    <IconButton
                        style={{
                            color: "white",
                            cursor: "pointer",
                            marginTop: "25px",
                        }}
                        onClick={handlePrevArtist}
                        disabled={artistIndex === 0}
                    >
                        <ArrowBackIosNewRoundedIcon />
                    </IconButton>
                    <Link
                        onClick={() => navigate("/section")}
                        to="/section"
                        variant="outlined"
                        color="primary"
                        style={{
                            textDecoration: "none",
                            color: "white",
                            fontSize: "20px",
                            verticalAlign: "middle",
                            marginTop: "30px",
                            fontWeight: "600",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        Показать все
                    </Link>
                    <IconButton
                        style={{
                            color: "white",
                            marginTop: "25px",
                            cursor:
                                artistIndex + 6 >= artists.length
                                    ? "not-allowed"
                                    : "pointer",
                            opacity:
                                artistIndex + 6 >= artists.length ? 0.5 : 1,
                        }}
                        onClick={handleNextArtist}
                        disabled={artistIndex + 6 >= artists.length}
                    >
                        <ArrowForwardIosRoundedIcon />
                    </IconButton>
                </div>
            </div>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "15px",
                    }}
                >
                    <CircularProgress style={{ color: "gray" }} />
                </div>
            ) : (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {artists.map((artist) => (
                        <CardStyled
                            key={artist.id}
                            onClick={() => navigate(`/artist/${artist.id}`)}
                            style={{
                                flex: "0 0 calc(16.666% - 20px)",
                                margin: "10px",
                                backgroundColor: "#222222",
                                height: "220px",
                                cursor: "pointer",
                                color: "white",
                            }}
                        >
                            {artist.images.length > 0 && (
                                <CardMediaStyled
                                    image={artist.images[0].url}
                                    title={artist.name}
                                />
                            )}
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {artist.name}
                                </Typography>
                            </CardContent>
                        </CardStyled>
                    ))}
                </div>
            )}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    color={"white"}
                    style={{
                        order: "1",
                        fontWeight: "700",
                        fontFamily: "Verdana",
                        marginTop: "25px",
                    }}
                >
                    Новые релизы
                </Typography>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        order: "2",
                    }}
                >
                    <IconButton
                        style={{
                            color: "white",
                            cursor: "pointer",
                            marginTop: "25px",
                        }}
                        onClick={handlePrevRelease}
                        disabled={releaseIndex === 0}
                    >
                        <ArrowBackIosNewRoundedIcon />
                    </IconButton>
                    <Link
                        onClick={() => navigate("/section")}
                        to="/section"
                        variant="outlined"
                        color="primary"
                        style={{
                            textDecoration: "none",
                            color: "white",
                            fontSize: "20px",
                            verticalAlign: "middle",
                            marginTop: "30px",
                            fontWeight: "600",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        Показать все
                    </Link>
                    <IconButton
                        style={{
                            color: "white",
                            marginTop: "25px",
                            cursor:
                                releaseIndex + 6 >= newReleases.length
                                    ? "not-allowed"
                                    : "pointer",
                            opacity:
                                releaseIndex + 6 >= newReleases.length
                                    ? 0.5
                                    : 1,
                        }}
                        onClick={handleNextRelease}
                        disabled={releaseIndex + 6 >= newReleases.length}
                    >
                        <ArrowForwardIosRoundedIcon />
                    </IconButton>
                </div>
            </div>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "15px",
                    }}
                >
                    <CircularProgress style={{ color: "gray" }} />
                </div>
            ) : (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {newReleases.map((release) => (
                        <CardStyled
                            key={release.id}
                            onClick={() => navigate(`/album/${release.id}`)}
                            style={{
                                flex: "0 0 calc(16.666% - 20px)",
                                margin: "10px",
                                backgroundColor: "#222222",
                                height: "220px",
                                cursor: "pointer",
                                color: "white",
                            }}
                        >
                            {release.images.length > 0 && (
                                <CardMediaStyled
                                    image={release.images[0].url}
                                    title={release.name}
                                />
                            )}
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {release.name}
                                </Typography>
                            </CardContent>
                        </CardStyled>
                    ))}
                </div>
            )}
        </ContainerStyled>
    );
};

export default Home;
