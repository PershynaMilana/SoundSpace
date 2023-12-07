import React, { useEffect, useState, useRef } from "react";
import { usePlayer } from "../services/PlayerContext";
import { Link } from "react-router-dom";
import {
  Typography,
  Grid,
  styled,
  Input,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PlayArrowIcon from "@mui/icons-material/PlayArrowRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ClearIcon from "@mui/icons-material/Clear";
import { app } from "../services/fairbaseConfig";
import CustomButton from "../components/CustomButton";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "100%",
  color: "white",
  background: `linear-gradient(#04009A -70%, #1d1d1d, black)`,
}));

const TrackContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#333",
  },
  width: "100%",
  height: "100%",
  maxHeight: "70px",
  position: "relative",
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
  marginTop: "70px",
  marginLeft: "20px",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "20px",
    marginLeft: "0",
  },
}));

const PlaylistDetails = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginLeft: "20px",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "column",
    marginLeft: "40px",
    alignItems: "flex-start",
  },
}));

const PlaylistDescription = styled(Typography)({
  fontWeight: "600",
  fontSize: "14px",
  color: "#b5b5b5",
});

const TrackImage = styled("img")({
  width: "50px",
  height: "50px",
  marginRight: "10px",
});

const TrackInfo = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const TrackDetails = styled("div")({
  marginLeft: "10px",
});

const TrackName = styled(Typography)({
  fontWeight: "700",
  fontSize: "16px",
  color: "white",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

const ArtistName = styled(Typography)({
  fontWeight: "600",
  fontSize: "14px",
  color: "#b5b5b5",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

const AlbumName = styled(Typography)({
  fontWeight: "600",
  fontSize: "14px",
  color: "#b5b5b5",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

const AlbumDescription = styled(Typography)({
  fontWeight: "600",
  fontSize: "14px",
  color: "#b5b5b5",
  marginTop: "0px",
});

const SearchContainer = styled("div")({
  position: "relative",
  display: "inline-block",
  margin: "16px",
});

const SearchInput = styled(Input)({
  backgroundColor: "#646464",
  decoration: "none",
  opacity: "0.5",
  color: "#c2c2c2",
  paddingLeft: "40px",
  cursor: "pointer",
  width: "500px",
  borderRadius: "5px",
  height: "40px",
  position: "relative",
  transition: "all 0.3s ease-in-out",
  "&:focus": {
    width: "700px",
    borderRadius: "0px",
    borderBottom: "none",
    color: "transparent",
    opacity: "0",
  },
  "&:hover": {
    textDecoration: "none",
    color: "transparent",
  },
  "& .MuiInput-underline:after": {
    borderBottom: "none",
  },
  "& .MuiInputBase-input": {
    "&:hover": {
      textDecoration: "none",
    },
  },
});

const SearchIcon = styled(SearchRoundedIcon)({
  color: "#9b9b9b",
  fontSize: 24,
  position: "absolute",
  left: "12px",
  top: "50%",
  transform: "translateY(-50%)",
});

const ClearIconCustom = styled(ClearIcon)({
  color: "#9b9b9b",
  fontSize: 20,
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
});

const TrackTable = styled(TableContainer)(({ theme }) => ({
  width: "90%",
  backgroundColor: "transparent",
  boxShadow: "none",
}));

const CustomTableRow = styled(TableRow)(({ theme, currentTrackId, track }) => ({
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#333",
    "& .playIcon": {
      visibility: "visible",
    },
    "& .customTableCells": {
      visibility: "hidden",
    },
  },
}));

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  color: "white",
  borderBottom: "none",
  position: "relative",
  textAlign: "center",
}));

const PlayIcon = styled(PlayArrowIcon)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "25px",
  width: "25px",
  color: "white",
  cursor: "pointer",
  visibility: "hidden",
});

const LikeButton = styled("button")({
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
    color: "#1DB954",
  },
});

const BackToPlaylist = ({ goBack }) => {
  return (
    <ArrowBackIosNewIcon
      onClick={goBack}
      style={{
        color: "white",
        cursor: "pointer",
        position: "absolute",
        top: "167px",
        left: "20px",
        marginRight: "20px",
        zIndex: 1,
      }}
    />
  );
};

const NewPlaylistContent = ({
  loading,
  playlist,
  goBack,
  searchTerm,
  setSearchTerm,
  searchResults,
  searchLoading,
  searchTracks,

  playPauseTrack,
  addToLikes,
  fetchPlaylistTracks,
  playlistTracks,
  handleAddTrack,
  removeFromPlaylist,
}) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [likedTracks, setLikedTracks] = useState([]);

  const handleLikeClick = (e, track) => {
    e.stopPropagation();
    track.isLiked = !track.isLiked;

    if (track.isLiked) {
      setLikedTracks((prevLikedTracks) => [...prevLikedTracks, track]);
      addToLikes(track);
    } else {
      setLikedTracks((prevLikedTracks) =>
        prevLikedTracks.filter((likedTrack) => likedTrack.id !== track.id)
      );
    }
  };

  useEffect(() => {
    fetchPlaylistTracks();
  }, []);

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim().length >= 2) {
      searchTracks();
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleRowClick = (track) => {
    setCurrentTrackId(track.id);
    setIsPlaying(currentTrackId === track?.id ? !isPlaying : true);
    setTrack(track);
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const { setTrack, currentTrack } = usePlayer();
  const audioPlayerRef = useRef(null);

  const playTrack = (track) => {
    setTrack(track);
    setIsPlaying(!isPlaying);
    setCurrentTrackId(track.id);
  };

  useEffect(() => {
    if (audioPlayerRef && audioPlayerRef.current) {
      audioPlayerRef.current.src = currentTrack?.preview_url || "";
    }
  }, [currentTrack, audioPlayerRef]);

  const handleRowHover = (index) => {
    const playIcons = document.getElementsByClassName(
      "playIcon" || "pauseIcon"
    );
    const customTableCells =
      document.getElementsByClassName("customTableCells");

    if (playIcons.length > index && customTableCells.length > index) {
      for (let i = 0; i < playIcons.length; i++) {
        playIcons[i].style.visibility = i === index ? "visible" : "hidden";
        customTableCells[i].style.visibility =
          i === index ? "hidden" : "visible";
      }
    }
  };

  return (
    <Container>
      {loading ? (
        <Typography variant="h5">Loading...</Typography>
      ) : (
        <>
          <Grid container spacing={2} style={{ width: "93%" }}>
            <BackToPlaylist
              goBack={goBack}
              style={{ height: "50px", width: "25px" }}
            />
            <InfoContainer>
              <PlaylistImage
                src={playlist.imageUrl}
                alt={playlist.name}
                style={{ marginLeft: "40px" }}
              />
              <PlaylistDetails>
                <Typography
                  variant="h1"
                  style={{
                    marginTop: "220px",
                    fontWeight: "700",
                    color: "white",
                  }}
                >
                  {playlist.name}
                </Typography>
                <PlaylistDescription>
                  {playlist.description}
                </PlaylistDescription>
              </PlaylistDetails>
            </InfoContainer>
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
                      textAlign: "center",
                    }}
                  >
                    <div style={{ textAlign: "center", fontSize: "14px" }}>
                      #
                    </div>
                  </CustomTableCell>
                  <CustomTableCell
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#b5b5b5",
                      textAlign: "center",
                    }}
                  >
                    Track
                  </CustomTableCell>
                  <CustomTableCell
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#b5b5b5",
                      textAlign: "center",
                    }}
                  >
                    Album
                  </CustomTableCell>
                  <CustomTableCell
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#b5b5b5",
                      textAlign: "center",
                    }}
                  >
                    Artist
                  </CustomTableCell>
                  <CustomTableCell
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#b5b5b5",
                      textAlign: "center",
                    }}
                  >
                    Duration
                  </CustomTableCell>
                  <CustomTableCell
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#b5b5b5",
                      textAlign: "center",
                    }}
                  >
                    Like
                  </CustomTableCell>
                  <CustomTableCell
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#b5b5b5",
                      textAlign: "center",
                    }}
                  >
                    Actions
                  </CustomTableCell>
                </TableRow>
              </TableHead>
              <div style={{ height: "20px" }}></div>
              <TableBody>
                {playlistTracks.map((track, index) => (
                  <CustomTableRow
                    key={track.id}
                    onMouseEnter={() => handleRowHover(index)}
                    onMouseLeave={() => handleRowHover(-1)}
                    onClick={() => handleRowClick(track)}
                    currentTrackId={currentTrackId}
                    track={track}
                  >
                    <CustomTableCell
                      style={{
                        borderRadius: "5px 0px 0px 5px",
                        color: "#b5b5b5",
                        padding: "0px",
                        position: "relative",
                      }}
                    >
                      <div
                        className="customTableCells"
                        style={{
                          width: "50px",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        {index + 1}
                      </div>
                      <PlayIcon className="playIcon" />
                    </CustomTableCell>
                    <CustomTableCell
                      style={{
                        color:
                          isPlaying && currentTrackId === track.id
                            ? "#1DB954"
                            : "white",
                      }}
                    >
                      {track.name}
                    </CustomTableCell>
                    <CustomTableCell style={{ textAlign: "center" }}>
                      <LikeButton>
                        <Link
                          to={`/album/${track.album.id}`}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            "&:hover": {
                              textDecoration: "underline",
                              color: "#1DB954",
                            },
                          }}
                        >
                          {track.album.name}
                        </Link>
                      </LikeButton>
                    </CustomTableCell>
                    <CustomTableCell style={{ textAlign: "center" }}>
                      <LikeButton>
                        <Link
                          to={`/artist/${track.artists[0].id}`}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            "&:hover": {
                              textDecoration: "underline",
                              color: "#1DB954",
                            },
                          }}
                        >
                          {track.artists[0].name}
                        </Link>
                      </LikeButton>
                    </CustomTableCell>
                    <CustomTableCell style={{ textAlign: "center" }}>
                      {msToTime(track.duration_ms)}
                    </CustomTableCell>
                    <CustomTableCell style={{ textAlign: "center" }}>
                      <FavoriteIcon
                        style={{
                          color: likedTracks.some(
                            (likedTrack) => likedTrack.id === track.id
                          )
                            ? "#1DB954"
                            : "white",
                          cursor: "pointer",
                        }}
                        onClick={(e) => handleLikeClick(e, track)}
                      />
                    </CustomTableCell>
                    <CustomTableCell
                      style={{
                        textAlign: "center",
                        borderRadius: "0px 5px 5px 0px",
                      }}
                    >
                      <LikeButton onClick={() => removeFromPlaylist(track.id)}>
                        Delete from playlist
                      </LikeButton>
                    </CustomTableCell>
                  </CustomTableRow>
                ))}
              </TableBody>
            </Table>
          </TrackTable>

          <Grid container spacing={0}>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                color: "white",
                cursor: "pointer",
                marginLeft: "auto",
                marginRight: "80px",
              }}
              onClick={() => setIsSearchVisible(!isSearchVisible)}
            >
              {isSearchVisible ? <>Close</> : "More"}
            </div>
          </Grid>
          <Grid
            container
            spacing={2}
            style={{ width: "93%", marginTop: "50px" }}
          >
            {isSearchVisible && (
              <SearchContainer>
                <SearchInput
                  color="success"
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                  placeholder="Search tracks"
                  style={{ color: "#FFFFFF" }}
                />
                <SearchIcon />
                {searchTerm && <ClearIconCustom onClick={handleClearSearch} />}
              </SearchContainer>
            )}
          </Grid>
          {searchLoading ? (
            <CircularProgress style={{ marginTop: "20px" }} />
          ) : (
            <TableBody style={{ width: "93%", paddingLeft: "20px" }}>
              {searchResults.map((track, index) => (
                <>
                  <TrackTable component={Paper} style={{ width: "100%" }}>
                    <Table style={{ tableLayout: "fixed" }}>
                      <TableBody style={{ width: "100%" }}>
                        <CustomTableRow
                          style={{ width: "170%", display: "table-row" }}
                          key={track.id}
                          className="trackRow"
                          onMouseEnter={() => handleRowHover(index)}
                          onMouseLeave={() => handleRowHover(-1)}
                          onClick={() => playPauseTrack(track)}
                        >
                          <CustomTableCell
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginLeft: "30px",
                            }}
                          >
                            <TrackImage
                              src={track.album.images[0].url}
                              title={track.name}
                              style={{ marginRight: "8px" }}
                            />
                            <div>
                              <div
                                style={{ fontSize: "16px", marginTop: "4px" }}
                              >
                                {track.name}
                              </div>
                              <div
                                style={{ color: "#afafaf", fontSize: "14px" }}
                              >
                                {track.artists[0].name}
                              </div>
                            </div>
                          </CustomTableCell>

                          <CustomTableCell style={{ paddingLeft: "300px" }}>
                            <AlbumName>{track.album.name}</AlbumName>
                          </CustomTableCell>

                          <CustomTableCell
                            style={{
                              paddingLeft: "300px",
                              marginRight: "200px",
                            }}
                          >
                            <CustomButton onClick={() => handleAddTrack(track)}>
                              Add to Playlist
                            </CustomButton>
                          </CustomTableCell>
                        </CustomTableRow>
                      </TableBody>
                    </Table>
                  </TrackTable>

                  <Divider style={{ margin: "15px 0", background: "#555" }} />
                </>
              ))}
            </TableBody>
          )}
        </>
      )}
    </Container>
  );
};

function msToTime(duration) {
  if (isNaN(duration) || duration === null || duration === undefined) {
    return "00:00";
  }
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export default NewPlaylistContent;
