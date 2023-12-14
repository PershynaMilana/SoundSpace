// SearchContent.js
import React from 'react';
import {
    Container,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Tabs,
    Tab,
    Divider,
    IconButton,
    CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import PlaylistTab from "../assets/tabs/SearchPageTabs/PlaylistTab";
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

const SearchContent = ({
  currentTab,
  setCurrentTab,
  query,
  artistResults,
  authorName,
  authorImage,
  searchResults,
  playlistResults,
  handleArtistClick,
  playTrack,
  playlistIndex,
  handlePrevPlaylist,
  handleNextPlaylist,
  loading,
  albumResults,
  handlePrevAlbum,
  handleNextAlbum,
  albumIndex,
  handlePlaylistClick,
  handleAlbumClick,
}) => {
    return (
        <ContainerStyled style={{maxWidth: "1400px", width:"100%"}}>
            <Tabs
                value={currentTab}
                onChange={(event, newValue) => setCurrentTab(newValue)}
                variant="fullWidth"
                textColor="primary"
                indicatorColor="primary"
                sx={{
                    justifyContent: "flex-start",
                    marginLeft: "80px",
                    color: "white",
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
                        fontWeight: "400",
                    },
                    "& .Mui-selected": {
                        backgroundColor: "#333333",
                        color: "white",
                    },
                }}
            >
                <Tab label="Page content" style={{ color: "white",}} />
                <Tab label="Artist playlists" style={{ color: "white",}} />
                <Tab label="Artist albums" style={{ color: "white",}} />
                <Tab label="Artist tracks" style={{ color: "white",}} />
            </Tabs>
            <Divider style={{ margin: "15px 0", background: "#555" }} />
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
                            Best result
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
                                                        textAlign: "left",
                                                    }}
                                                />
                                            )}
                                            <Typography
                                                variant="h4"
                                                style={{
                                                    textAlign: "left",
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
                                                    Artist
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
                            Tracks
                        </Typography>
                        <ul
                            className="track-list"
                            style={{
                                paddingLeft: "0",
                                width: "550px",
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
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "10px",
                            }}
                        >
                            <Typography
                                variant="h5"
                                style={{
                                    color: "white",
                                    fontWeight: "600",
                                    marginBottom: "30px",
                                    padding: "0",
                                    width: "1200px",
                                    marginTop: "30px",
                                }}
                            >
                                Playlists
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

                                <IconButton
                                    style={{
                                        color: "white",
                                        marginTop: "25px",
                                        cursor:
                                            playlistIndex + 7 >=
                                            playlistResults.length
                                                ? "not-allowed"
                                                : "pointer",
                                        opacity:
                                            playlistIndex + 7 >=
                                            playlistResults.length
                                                ? 0.5
                                                : 1,
                                    }}
                                    onClick={handleNextPlaylist}
                                    disabled={
                                        playlistIndex + 7 >=
                                        playlistResults.length
                                    }
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
                                {playlistResults
                                    .slice(playlistIndex, playlistIndex + 7)
                                    .map((release) => (
                                        <CardStyled
                                            key={release.id}
                                            onClick={() =>
                                                handlePlaylistClick(release.id)
                                            }
                                            style={{
                                                flex: '0 0 calc(14.285% - 20px)',
                                                margin: "10px",
                                                backgroundColor: "#222222",
                                                height: "220px",
                                                cursor: "pointer",
                                                color: "white",
                                            }}
                                        >
                                            {release.images.length > 0 && (
                                                <CardMediaStyled
                                                    image={
                                                        release.images[0].url
                                                    }
                                                    title={release.name}
                                                />
                                            )}
                                            <CardContent>
                                                <Typography
                                                    variant="h6"
                                                    component="div"
                                                >
                                                    {release.name}
                                                </Typography>
                                            </CardContent>
                                        </CardStyled>
                                    ))}
                            </div>
                        )}
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
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "10px",
                            }}
                        >
                            <Typography
                                variant="h5"
                                style={{
                                    color: "white",
                                    fontWeight: "600",
                                    marginBottom: "30px",
                                    padding: "0",
                                    width: "1200px",
                                    marginTop: "30px",
                                }}
                            >
                                Albums
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
                                    onClick={handlePrevAlbum}
                                    disabled={albumIndex === 0}
                                >
                                    <ArrowBackIosNewRoundedIcon />
                                </IconButton>

                                <IconButton
                                    style={{
                                        color: "white",
                                        marginTop: "25px",
                                        cursor:
                                            albumIndex + 7 >=
                                            albumResults.length
                                                ? "not-allowed"
                                                : "pointer",
                                        opacity:
                                            albumIndex + 7 >=
                                            albumResults.length
                                                ? 0.5
                                                : 1,
                                    }}
                                    onClick={handleNextAlbum}
                                    disabled={
                                        albumIndex + 7 >= albumResults.length
                                    }
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
                                {albumResults
                                    .slice(albumIndex, albumIndex + 7)
                                    .map(
                                        (album) =>
                                            album?.images?.length > 0 && (
                                                <CardStyled
                                                    key={album?.id}
                                                    onClick={() =>
                                                        handleAlbumClick(
                                                            album?.id
                                                        )
                                                    }
                                                    style={{
                                                        flex: '0 0 calc(14.285% - 20px)',
                                                        margin: "10px",
                                                        backgroundColor:
                                                            "#222222",
                                                        height: "220px",
                                                        cursor: "pointer",
                                                        color: "white",
                                                    }}
                                                >
                                                    <CardMediaStyled
                                                        image={
                                                            album?.images[0].url
                                                        }
                                                        title={album?.name}
                                                    />
                                                    <CardContent>
                                                        <Typography
                                                            variant="h6"
                                                            component="div"
                                                        >
                                                            {album?.name}
                                                        </Typography>
                                                    </CardContent>
                                                </CardStyled>
                                            )
                                    )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {currentTab === 1 && (
                <PlaylistTab
                    playlistResults={playlistResults}
                    handlePlaylistClick={handlePlaylistClick}
                />
            )}
            {currentTab === 2 && (
                <AlbumTab
                    albumResults={albumResults}
                    handleAlbumClick={handleAlbumClick}
                />
            )}

            {currentTab === 3 && <TrackTab trackResults={searchResults} />}
        </ContainerStyled>
    );
};

export default SearchContent;
