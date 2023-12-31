import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clientId, clientSecret } from "../configs/spotifyAuth";
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CircularProgress,
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
    textAlign: "center",
    height: "100%",
    transition: "transform 0.2s",
    flex: "1 1 auto",
    "&:hover": {
        transform: "scale(1.05)",
    },
}));

const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
    width: "100%",
    height: 0,
    paddingTop: "56.25%",
}));

const Section = () => {
    const [sectionPlaylists, setSectionPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

        const getAllSectionPlaylists = async (token) => {
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
                return response.data.playlists.items;
            } catch (error) {
                console.error("Ошибка при получении всех плейлистов:", error);
                return [];
            }
        };

        const fetchData = async () => {
            const token = await getToken();
            if (token) {
                const sectionPlaylists = await getAllSectionPlaylists(token);
                setSectionPlaylists(sectionPlaylists);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handlePlaylistClick = (playlistId) => {
        navigate(`/playlist/${playlistId}`);
    };

    return (
        <ContainerStyled maxWidth="lg">
            <Typography variant="h4" color={"white"} gutterBottom>
                All playlists
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={3}>
                    {sectionPlaylists.map((playlist) => (
                        <Grid item key={playlist.id} xs={12} sm={6} md={4} lg={3}>
                            <CardStyled
                                key={playlist.id}
                                style={{
                                    flex: "0 0 calc(16.666% - 20px)",
                                    margin: "10px",
                                    backgroundColor: "#222222",
                                    height: "220px",
                                    cursor: "pointer",
                                    color: "white",
                                }}
                                onClick={() => handlePlaylistClick(playlist.id)}
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
                        </Grid>
                    ))}
                </Grid>
            )}
        </ContainerStyled>
    );
};

export default Section;
