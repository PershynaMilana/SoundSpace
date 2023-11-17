import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import getToken from "../../services/spotifyAuth";
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
    Card,
    CardMedia,
    CardContent,
    Tab,
    Tabs,
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
    marginLeft: "20px",
    marginRight: "20px",
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

const AuthorContent = ({
    loading,
    artist,
    topTracks,
    displayedTracks,
    handleRowHover,
    playTrack,
    expanded,
    toggleTracks,
    selectedTab,
    albums,
    artists,
    handleAlbumClick,
    handleArtistClick,
    handleTabChange,
    handleClick,
}) => (
    <Container>
        {loading ? (
            <Typography variant="h5">Загрузка...</Typography>
        ) : (
            <>
                <Grid container spacing={2} style={{ width: "93%" }}>
                    <Grid item>
                        <BackToArtists
                            style={{ height: "100px", width: "100px" }}
                        />
                        <ArtistImage
                            src={artist.images[0].url}
                            alt={artist.name}
                            style={{ marginLeft: "40px" }}
                        />
                    </Grid>
                    <Grid item>
                        <InfoContainer>
                            <Typography
                                variant="h1"
                                style={{
                                    marginTop: "170px",
                                    marginLeft: "35px",
                                    fontWeight: "700",
                                }}
                            >
                                {artist.name}
                            </Typography>
                            <Typography
                                variant="body1"
                                style={{
                                    fontWeight: "600",
                                    marginLeft: "35px",
                                }}
                            >
                                Популярность: {artist.popularity}
                            </Typography>
                        </InfoContainer>
                    </Grid>
                </Grid>
                <TrackTable component={Paper}>
                    <Table>
                        <TableHead style={{ borderBottom: "1px solid #333" }}>
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
                        <TableBody>
                            {topTracks
                                .slice(0, displayedTracks)
                                .map((track, index) => (
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
                {topTracks.length > 5 && (
                    <div
                        style={{
                            textAlign: "right",
                            marginTop: "20px",
                            width: "100%",
                        }}
                    >
                        <div>
                            <button
                                onClick={toggleTracks}
                                style={{
                                    background: "#333333",
                                    paddingLeft: "25px",
                                    paddingRight: "25px",
                                    paddingTop: "7px",
                                    paddingBottom: "7px",
                                    borderRadius: "50px",
                                    fontFamily: "Verdana",
                                    border: "none",
                                    color: "#888",
                                    cursor: "pointer",
                                    transition: "color 0.3s ease-in-out",
                                    fontWeight: "500",
                                    marginRight: "150px",
                                    marginTop: "30px",
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = "white";
                                    e.target.style.background = "#404040";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = "#888";
                                    e.target.style.background = "#333333";
                                }}
                            >
                                {expanded ? "Свернуть" : "Еще"}
                            </button>
                        </div>
                    </div>
                )}
                <div style={{ marginTop: "20px", width: "100%" }}>
                    <Tabs
                        value={selectedTab}
                        onChange={(event, newValue) => handleClick(newValue)}
                        centered={false}
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
                        <Tab
                            label="Альбомы"
                            value="albums"
                            style={{ fontWeight: "500" }}
                        />
                        <Tab
                            label="Похожие исполнители"
                            value="artists"
                            style={{ fontWeight: "500" }}
                        />
                    </Tabs>
                </div>

                <div
                    style={{
                        color: "white",
                        fontFamily: "Verdana",
                        marginTop: "30px",
                        width: "90%",
                        fontWeight: "500",
                        padding: "0px",
                        margin: "0 auto",
                    }}
                >
                    {selectedTab === "albums" && (
                        <div>
                            <div
                                style={{
                                    color: "white",
                                    fontFamily: "Verdana",
                                    marginTop: "30px",
                                    width: "100%",
                                    fontWeight: "500",
                                    padding: "0px",
                                    margin: "0 auto",
                                }}
                            >
                                {albums && (
                                    <div>
                                        <Typography
                                            variant="h5"
                                            style={{
                                                color: "white",
                                                fontWeight: "600",
                                                marginBottom: "30px",
                                                padding: "0",
                                                width: "500px",
                                                marginTop: "30px",
                                            }}
                                        >
                                            Альбомы
                                        </Typography>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                            }}
                                        >
                                            {albums.map((album) => (
                                                <div
                                                    key={album.id}
                                                    className="album-item"
                                                    style={{
                                                        width: "230px",
                                                        height: "250px",
                                                        borderRadius: "10px",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        margin: "10px",
                                                    }}
                                                    onClick={() =>
                                                        handleAlbumClick(
                                                            album.id
                                                        )
                                                    }
                                                >
                                                    {album.images[0] && (
                                                        <CardStyled>
                                                            <CardMediaStyled
                                                                image={
                                                                    album
                                                                        .images[0]
                                                                        .url
                                                                }
                                                                title={
                                                                    album.name
                                                                }
                                                            />
                                                            <CardContent>
                                                                <Typography
                                                                    variant="h6"
                                                                    component="div"
                                                                    style={{
                                                                        textAlign:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    {album.name}
                                                                </Typography>
                                                                <Typography
                                                                    variant="body2"
                                                                    component="div"
                                                                    style={{
                                                                        textAlign:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    by{" "}
                                                                    {
                                                                        album
                                                                            .artists[0]
                                                                            .name
                                                                    }
                                                                </Typography>
                                                            </CardContent>
                                                        </CardStyled>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {selectedTab === "artists" && (
                        <div>
                            <Typography
                                variant="h5"
                                style={{
                                    color: "white",
                                    fontWeight: "600",
                                    marginBottom: "30px",
                                    padding: "0",
                                    width: "500px",
                                    marginTop: "30px",
                                }}
                            >
                                Похожие исполнители
                            </Typography>
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                }}
                            >
                                {artists.map((artist) => (
                                    <div
                                        key={artist.id}
                                        className="artist-item"
                                        style={{
                                            width: "230px",
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
                                        {artist.images[0] && (
                                            <CardStyled>
                                                <CardMediaStyled
                                                    image={artist.images[0].url}
                                                    title={artist.name}
                                                />
                                                <CardContent>
                                                    <Typography
                                                        variant="h6"
                                                        component="div"
                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        {artist.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        component="div"
                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        Подписчики:{" "}
                                                        {artist.followers.total}
                                                    </Typography>
                                                </CardContent>
                                            </CardStyled>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </>
        )}
    </Container>
);
export default AuthorContent;
