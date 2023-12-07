import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import DefaultPhoto from "../assets/images/default-image.jpg";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import EditProfileInfoModal from "../components/EditProfileInfoModal";
import PlayArrowIcon from "@mui/icons-material/PlayArrowRounded";
import { useLikes } from "../services/LikesContext";
import { usePlayer } from "../services/PlayerContext";

import {
  Typography,
  Grid,
  styled,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  Paper,
  Divider,
} from "@mui/material";

const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  minHeight: "100vh",
  color: "white",
  background: `linear-gradient(#04009A -70%, #1d1d1d, black)`,
  overflow: "hidden",
}));

const Container2 = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  minHeight: "auto",
  color: "white",
  background: `transperent`,
  overflow: "hidden",
}));

const ProfileImage = styled("img")({
  marginBottom: "20px",
  maxWidth: "300px",
  maxHeight: "300px",
  width: "100%",
  height: "100%",
  marginLeft: "40px",
  marginTop: "70px",
  borderRadius: "150px",
});

const InfoContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginLeft: "20px",
  marginTop: "70px",
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

const SectionContainer = styled("div")({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  margin: "0 auto",
  "& > *": {
    flex: "0 0 calc(14.285% - 20px)",
    margin: "10px",
  },
});

const BackToArtists = ({ goBack }) => {
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

const TrackImage = styled(CardMedia)(({ theme }) => ({
  width: "50px",
  height: "50px",
  borderRadius: "5px",
}));

const TrackTable = styled(TableContainer)(({ theme }) => ({
  width: "90%",
  backgroundColor: "transparent",
  boxShadow: "none",
}));

const CustomTableRow = styled(TableRow)(({ theme, currentTrackId, track }) => ({
  backgroundColor: currentTrackId === track.id ? "#333" : "transparent",
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

const PlayIcon = styled(PlayArrowIcon)({
  position: "relative",
  top: "30%",
  left: "8%",
  height: "25px",
  width: "25px",
  color: "white",
  cursor: "pointer",
  visibility: "hidden",
});

const Profile = () => {
  const navigate = useNavigate();
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [userData, setUserData] = useState({ name: "" });
  const [token, setToken] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [updatedName, setUpdatedName] = useState("");
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { likedTracks, removeFromLikes } = useLikes();
  const { setTrack, currentTrack } = usePlayer();
  const audioPlayerRef = useRef(null);
  const lastFiveLikedTracks = likedTracks.slice(-5).reverse();
  const [dominantColor, setDominantColor] = useState("#04009A");

  const handleImageLoad = (colors) => {
    if (colors && colors.length > 0) {
      setDominantColor(colors[0]);
    }
  };

  const handleImageError = (error) => {
    console.error("Error loading image:", error);
  };

  useEffect(() => {
    if (audioPlayerRef && audioPlayerRef.current) {
      audioPlayerRef.current.src = currentTrack?.preview_url || "";
    }
  }, [currentTrack, audioPlayerRef]);

  useEffect(() => {
    const storedToken = getCookie("auth_token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      loadPlaylists();
      loadUserData();
    }
  }, [token]);

  const handleNextPlaylist = () => {
    setPlaylistIndex((prevIndex) => prevIndex + 6);
  };

  const handlePrevPlaylist = () => {
    setPlaylistIndex((prevIndex) => Math.max(0, prevIndex - 6));
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const goBack = () => {
    navigate(-1);
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const loadPlaylists = async () => {
    try {
      const decodedToken = parseJwt(token);
      console.log("Decoded Token:", decodedToken);
      console.log("Token load playlist:", token);
      const response = await axios.get("http://localhost:8080/api/playlists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: decodedToken.id,
        },
      });
      setPlaylists(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading playlists:", error);
    }
  };

  const loadUserData = async () => {
    try {
      const storedToken = getCookie("auth_token");
      const decodedToken = parseJwt(token);
      console.log("Decoded Token:", decodedToken);
      console.log("Token load user data:", token);
      const response = await axios.get("http://localhost:8080/api/user", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      setUpdatedName(response.data.user.name);
      console.log("Updated Name:", response.data.user.name);
      setUserData(response.data.user);
    } catch (error) {
      console.error("Error loading user data:", error);
      console.log("Axios Error Details:", error.response);
    }
  };

  const handleEditProfile = async (name, imageUrl) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/update-profile",
        {
          name,
          imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData(response.data.user);
      setShowEditProfileModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handlePlaylistClick = (playlistId) => {
    navigate(`/newplaylist/${playlistId}`);
  };

  const handleRowClick = (track) => {
    setCurrentTrackId(track.id);
    setIsPlaying(currentTrackId === track.id ? !isPlaying : true);
    setTrack(track);
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(null);

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
        <Typography variant="h5" style={{ marginTop: "300px" }}>
          Loading...
        </Typography>
      ) : (
        <>
          <Grid container spacing={2} style={{ width: "94%" }}>
            <Grid item>
              <BackToArtists
                goBack={goBack}
                style={{ height: "100px", width: "100px" }}
              />
              <ProfileImage
                src={(userData && userData.imageUrl) || DefaultPhoto}
                alt={"username"}
                style={{ marginLeft: "30px" }}
                onClick={() => setShowEditProfileModal(true)}
              />
              {showEditProfileModal && (
                <EditProfileInfoModal
                  open={showEditProfileModal}
                  onClose={() => setShowEditProfileModal(false)}
                  onEditProfile={handleEditProfile}
                />
              )}
            </Grid>
            <Grid item>
              <InfoContainer>
                <Typography
                  variant="h1"
                  style={{
                    marginTop: "170px",
                    marginLeft: "11px",
                    fontWeight: "700",
                  }}
                >
                  {userData && userData.name}
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    fontWeight: "600",
                    marginLeft: "15px",
                    color: "#7f7f7f",
                  }}
                >
                  {`${playlists.length} playlists`}
                </Typography>
              </InfoContainer>
            </Grid>
          </Grid>
          <Container2>
            <Typography
              variant="h4"
              style={{
                fontWeight: "700",
                alignSelf: "flex-start",
                marginLeft: "80px",
                marginTop: "70px",
              }}
            >
              Your liked tracks
            </Typography>
            {likedTracks.length === 0 ? (
              <p>The list is empty</p>
            ) : (
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
                          textAlign: "left",
                          marginLeft: "20px",
                        }}
                      >
                        Track
                      </CustomTableCell>
                      <CustomTableCell
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#b5b5b5",
                          textAlign: "left",
                          marginLeft: "230px",
                          display: "flex",
                          alignItems: "right",
                        }}
                      >
                        Album
                      </CustomTableCell>
                      <CustomTableCell
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#b5b5b5",
                          textAlign: "right",
                        }}
                      ></CustomTableCell>
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
                        Actions
                      </CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <br />
                  <TableBody>
                    {lastFiveLikedTracks.map((track, index) => (
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
                          style={{ display: "flex", alignItems: "left" }}
                        >
                          <TrackImage
                            image={track.album.images[0].url}
                            title={track.name}
                            style={{ marginRight: "8px" }}
                          />
                          <div>
                            <div
                              style={{
                                fontSize: "16px",
                                marginTop: "4px",
                                marginLeft: "6px",
                                color:
                                  isPlaying && currentTrackId === track.id
                                    ? "#1DB954"
                                    : "white",
                              }}
                            >
                              {track.name}
                            </div>
                            <div
                              style={{
                                color: "#afafaf",
                                fontSize: "14px",
                                textAlign: "left",
                              }}
                            >
                              <LikeButton>
                                <Link
                                  to={`/artist/${track.artists[0].id}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    textAlign: "left",
                                    "&:hover": {
                                      textDecoration: "underline",
                                      color: "#1DB954",
                                    },
                                  }}
                                >
                                  {track.artists[0].name}
                                </Link>
                              </LikeButton>
                            </div>
                          </div>
                        </CustomTableCell>
                        <CustomTableCell>
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
                        <CustomTableCell></CustomTableCell>
                        <CustomTableCell style={{ textAlign: "center" }}>
                          {msToTime(track.duration_ms)}
                        </CustomTableCell>
                        <CustomTableCell
                          style={{
                            textAlign: "center",
                            borderRadius: "0px 5px 5px 0px",
                          }}
                        >
                          <LikeButton onClick={() => removeFromLikes(track.id)}>
                            Delete from likes
                          </LikeButton>
                        </CustomTableCell>
                      </CustomTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TrackTable>
            )}
          </Container2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "88%",
              marginTop: "70px",
            }}
          >
            <Typography
              variant="h4"
              style={{
                fontWeight: "700",
                alignSelf: "flex-start",
              }}
            >
              Your playlists
            </Typography>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-end",
              }}
            >
              <IconButton
                style={{
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={handlePrevPlaylist}
                disabled={playlistIndex === 0}
              >
                <ArrowBackIosNewRoundedIcon />
              </IconButton>
              <Link
                onClick={() => navigate("/library/sets")}
                to="/library/sets"
                variant="outlined"
                color="primary"
                style={{
                  marginTop: "10px",
                  textDecoration: "none",
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "600",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Show all
              </Link>
              <IconButton
                style={{
                  color: "white",
                  cursor:
                    playlistIndex + 6 >= playlists.length
                      ? "not-allowed"
                      : "pointer",
                  opacity: playlistIndex + 6 >= playlists.length ? 0.5 : 1,
                }}
                onClick={handleNextPlaylist}
                disabled={playlistIndex + 6 >= playlists.length}
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
            <SectionContainer
              container
              spacing={3}
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: "10px",
                marginLeft: "90px",
              }}
            >
              {playlists
                .slice(playlistIndex, playlistIndex + 6)
                .map((playlist) => (
                  <div onClick={() => handlePlaylistClick(playlist._id)}>
                    <CardStyled
                      style={{
                        background: "#222222",
                        color: "white",
                        width: "100%",
                        height: "280px",
                        margin: "10px",
                        alignItems: "left",
                      }}
                    >
                      <CardMediaStyled
                        image={playlist.imageUrl}
                        title={playlist.name}
                        description={playlist.description}
                      />
                      <CardContent>
                        <Typography
                          variant="h6"
                          component="div"
                          style={{ textAlign: "center" }}
                        >
                          {playlist.name}
                        </Typography>
                        <Typography
                          variant="p"
                          component="div"
                          style={{ textAlign: "center" }}
                        >
                          {playlist.description}
                        </Typography>
                      </CardContent>
                    </CardStyled>
                  </div>
                ))}
            </SectionContainer>
          )}
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

export default Profile;
