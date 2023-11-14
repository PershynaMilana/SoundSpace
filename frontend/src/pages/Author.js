import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { clientId, clientSecret } from "../services/spotifyAuth";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PlayArrowIcon from "@mui/icons-material/PlayArrowRounded";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Grid,
    styled,
} from "@mui/material";

const Container = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    color: "white",
    background: `linear-gradient(#04009A -70%, #1d1d1d, black)`,
}));

const ArtistImage = styled("img")({
    marginBottom: "20px",
    maxWidth: "300px",
    maxHeight: "300px",
    width: "100%",
    height: "100%",
    marginLeft: "40px",
    marginTop: "70px",
});

const InfoContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: "20px",
    marginTop: "70px",
}));

const TrackTable = styled(TableContainer)(({ theme }) => ({
    width: "90%",
    backgroundColor: "transparent",
    boxShadow: "none",
}));

const CustomTableRow = styled(TableRow)({
    "&:hover": {
        backgroundColor: "#333",
    },
});

const CustomTableCell = styled(TableCell)(({ theme }) => ({
    color: "white",
    borderBottom: "none",
}));

const PlayIcon = styled(PlayArrowIcon)({
    position: "absolute",
    height: "25px",
    width: "25px",
    color: "white",
    marginRight: "50px",

    transform: "translate(-57%, -15%)",
    cursor: "pointer",
    visibility: "hidden",
});

const BackToArtists = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <ArrowBackIosNewIcon
            onClick={goBack}
            style={{
                color: "white",
                cursor: "pointer",
                position: "absolute",
                top: "137px",
                left: "20px",
                marginRight: "20px",
                zIndex: 1,
            }}
        />
    );
};

const Author = () => {
    const { artistId } = useParams();
    const [artist, setArtist] = useState(null);
    const [topTracks, setTopTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentTrack, setCurrentTrack] = useState(null);

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

    useEffect(() => {
        if (artistId) {
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

            const getArtistInfo = async (token) => {
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
                    console.error(
                        "Ошибка при получении информации об артисте:",
                        error
                    );
                    return null;
                }
            };

            const getTopTracks = async (token) => {
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
                    console.error(
                        "Ошибка при получении топ-треков артиста:",
                        error
                    );
                    return [];
                }
            };

            const fetchData = async () => {
                const token = await getToken();
                if (token) {
                    const artistInfo = await getArtistInfo(token);
                    const artistTopTracks = await getTopTracks(token);
                    setArtist(artistInfo);
                    setTopTracks(artistTopTracks);
                    setLoading(false);
                }
            };
            fetchData();
        }

        return () => {
            document.body.style.background = "";
        };
    }, [artistId]);

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

    return (
        <Container>
            {loading ? (
                <Typography variant="h5">Загрузка...</Typography>
            ) : (
                <>
                    <Grid container spacing={2} style={{ width: "93%" }}>
                        <Grid>
                            <BackToArtists
                                style={{ height: "100px", width: "100px" }}
                            />
                            <ArtistImage
                                src={artist.images[0].url}
                                alt={artist.name}
                                style={{ marginLeft: "40px" }}
                            />
                        </Grid>
                        <Grid>
                            <InfoContainer>
                                <Typography
                                    variant="h1"
                                    style={{
                                        marginTop: "170px",
                                        marginLeft:"35px",
                                        fontWeight: "700",
                                    }}
                                >
                                    {artist.name}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    style={{ fontWeight: "600",marginLeft:"35px" }}
                                >
                                    Популярность: {artist.popularity}
                                </Typography>
                            </InfoContainer>
                        </Grid>
                    </Grid>
                    <TrackTable component={Paper}>
                        <Table>
                            <TableHead
                                style={{ borderBottom: "1px solid #333" }}
                            >
                                <TableRow>
                                    <CustomTableCell
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "700",
                                            color: "#b5b5b5",
                                        }}
                                    >
                                        #
                                    </CustomTableCell>
                                    <CustomTableCell
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "700",
                                            color: "#b5b5b5",
                                        }}
                                    >
                                        Название трека
                                    </CustomTableCell>
                                    <CustomTableCell
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "700",
                                            color: "#b5b5b5",
                                            textAlign: "center",
                                        }}
                                    >
                                        Популярность
                                    </CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <br />
                            <TableBody>
                                {topTracks.map((track, index) => (
                                    <CustomTableRow
                                        key={track.id}
                                        onMouseEnter={() =>
                                            handleRowHover(index)
                                        }
                                        onMouseLeave={() => handleRowHover(-1)}
                                        onClick={() => playTrack(track)}
                                    >
                                        <CustomTableCell
                                            className="customTableCell"
                                            style={{
                                                borderRadius: "5px 0px 0px 5px",
                                                color: "#b5b5b5",
                                                padding: "0px",
                                            }}
                                        >
                                            {index + 1}
                                            <PlayIcon
                                                className="playIcon"
                                                style={{
                                                    marginRight: "80px",
                                                    padding: "0px",
                                                }}
                                            />
                                        </CustomTableCell>
                                        <CustomTableCell>
                                            {track.name}
                                        </CustomTableCell>
                                        <CustomTableCell
                                            style={{
                                                borderRadius: "0px 5px 5px 0px",
                                                textAlign: "center",
                                            }}
                                        >
                                            {track.popularity}
                                        </CustomTableCell>
                                    </CustomTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TrackTable>
                </>
            )}
        </Container>
    );
};

export default Author;
