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

const PlaylistImage = styled("img")({
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

const BackToPlaylist = () => {
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

const Playlist = () => {
    const { playlistId } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (playlistId) {
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

            const getPlaylistInfo = async (token) => {
                try {
                    const response = await axios.get(
                        `https://api.spotify.com/v1/playlists/${playlistId}`,
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
                        "Ошибка при получении информации о плейлисте:",
                        error
                    );
                    return null;
                }
            };

            const getPlaylistTracks = async (token) => {
                try {
                    const response = await axios.get(
                        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            withCredentials: false,
                        }
                    );
                    return response.data.items;
                } catch (error) {
                    console.error(
                        "Ошибка при получении треков плейлиста:",
                        error
                    );
                    return [];
                }
            };

            const fetchData = async () => {
                const token = await getToken();
                if (token) {
                    const playlistInfo = await getPlaylistInfo(token);
                    const playlistTracks = await getPlaylistTracks(token);
                    setPlaylist(playlistInfo);
                    setTracks(playlistTracks);
                    setLoading(false);
                }
            };
            fetchData();
        }
        return () => {
            document.body.style.background = "";
        };
    }, [playlistId]);

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
                            <BackToPlaylist
                                style={{ height: "100px", width: "100px" }}
                            />
                            <PlaylistImage
                                src={playlist.images[0].url}
                                alt={playlist.name}
                                style={{ marginLeft: "40px" }}
                            />
                        </Grid>
                        <Grid>
                            <InfoContainer>
                                <Typography
                                    variant="h1"
                                    style={{
                                        marginTop: "170px",
                                        fontWeight: "700",
                                    }}
                                >
                                    {playlist.name}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    style={{ fontWeight: "600" }}
                                >
                                    {playlist.description}
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
                                        }}
                                    >
                                        Название альбома
                                    </CustomTableCell>
                                    <CustomTableCell
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "700",
                                            color: "#b5b5b5",
                                            textAlign: "center",
                                        }}
                                    >
                                        Время трека
                                    </CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <br />
                            <TableBody>
                                {tracks.map((track, index) => (
                                    <CustomTableRow
                                        key={track.track.id}
                                        onMouseEnter={() =>
                                            handleRowHover(index)
                                        }
                                        onMouseLeave={() => handleRowHover(-1)}
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
                                        <CustomTableCell
                                            style={{
                                                borderRadius: "5px 0px 0px 5px",
                                            }}
                                        >
                                            {track.track.name}
                                        </CustomTableCell>
                                        <CustomTableCell>
                                            {track.track.album.name}
                                        </CustomTableCell>
                                        <CustomTableCell
                                            style={{
                                                borderRadius: "0px 5px 5px 0px",
                                                textAlign: "center",
                                            }}
                                        >
                                            {msToTime(track.track.duration_ms)}
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

function msToTime(duration) {
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export default Playlist;
