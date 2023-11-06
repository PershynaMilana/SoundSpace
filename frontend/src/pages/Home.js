import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { clientId, clientSecret } from "../services/spotifyAuth";
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CircularProgress,
    Button,
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
    const [loading, setLoading] = useState(true);

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
                return response.data.playlists.items.slice(0, 5);
            } catch (error) {
                console.error(
                    "Ошибка при получении популярных плейлистов:",
                    error
                );
                return [];
            }
        };

        const fetchData = async () => {
            const token = await getToken();
            if (token) {
                const playlists = await getPopularPlaylists(token);
                setPopularPlaylists(playlists);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <ContainerStyled maxWidth="lg">
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
                    style={{ order: "1" }}
                >
                    Популярные плейлисты
                </Typography>
                <Link
                    to="/section"
                    variant="outlined"
                    color="primary"
                    style={{
                        order: "2",
                        textDecoration: "none",
                        color: "grey",
                        fontSize: "20px",
                        verticalAlign: "middle",
                        marrginTop: "30px",
                        "&:hover": {
                            textDecoration: "underline",
                        },
                    }}
                >
                    Показать все
                </Link>
            </div>
            {loading ? (
                <CircularProgress />
            ) : (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {popularPlaylists.map((playlist) => (
                        <CardStyled
                            key={playlist.id}
                            style={{
                                flex: "0 0 calc(20% - 20px)",
                                margin: "10px",
                                backgroundColor: "#222222",
                                height: "220px",
                            }}
                        >
                            <CardMediaStyled
                                image={playlist.images[0].url}
                                title={playlist.name}
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    <Link
                                        to={`/playlist/${playlist.id}`}
                                        style={{
                                            order: "2",
                                            textDecoration: "none",
                                            color: "grey",
                                            textAlign: "center",
                                            verticalAlign: "middle",
                                            fontSize: "18px",
                                            fontWeight: "550",
                                            "&:hover": {
                                                textDecoration: "underline",
                                            },
                                        }}
                                    >
                                        {playlist.name}
                                    </Link>
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