import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import DefaultPhoto from "../assets/images/default-image.jpg";
import axios from "axios";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
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

const LikeButton = styled("button")({
  background: "none",
  border: "none",
  color: "white",
  cursor: "pointer",
});

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

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [updatedName, setUpdatedName] = useState("");
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { likedTracks, removeFromLikes } = useLikes();
  const { setTrack, currentTrack } = usePlayer();
  const audioPlayerRef = useRef(null);

  const lastFiveLikedTracks = likedTracks.slice(-5).reverse();

  const playTrack = (track) => {
    setTrack(track);
  };

  useEffect(() => {
    if (audioPlayerRef && audioPlayerRef.current) {
      audioPlayerRef.current.src = currentTrack?.preview_url || "";
    }
  }, [currentTrack, audioPlayerRef]);

  const handleRowHover = (index) => {
    const playIcons = document.getElementsByClassName("playIcon");
    const customTableCells = document.getElementsByClassName("customTableCell");
    for (let i = 0; i < playIcons.length; i++) {
      playIcons[i].style.visibility = i === index ? "visible" : "hidden";
      customTableCells[i].style.visibility = i === index ? "hidden" : "visible";
    }
  };

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
      setUserData(response.data.user.name); // Set user data once
    } catch (error) {
      console.error("Error loading user data:", error);
      console.log("Axios Error Details:", error.response);
    }
  };

  const handlePlaylistClick = (playlistId) => {
    navigate(`/newplaylist/${playlistId}`);
  };

  return (
    <Container>
      {/* {loading ? (
        <Typography variant="h5">Загрузка...</Typography>
      ) : ( */}
      <>
        <Grid container spacing={2} style={{ width: "94%" }}>
          <Grid item>
            <BackToArtists
              goBack={goBack}
              style={{ height: "100px", width: "100px" }}
            />
            <ProfileImage
              src={DefaultPhoto}
              alt={"username"}
              style={{ marginLeft: "30px" }}
            />
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
                {userData.name || "Milka"}
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
            marginTop: "20px",
          }}
        >
          <Typography
            variant="h4"
            style={{
              fontWeight: "700",
              textAlign: "left",
              marginRight: "1000px",
            }}
          >
            Your playlists
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
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
              onClick={() => navigate("/section")}
              to="/section"
              variant="outlined"
              color="primary"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "20px",
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

        <Container2>
          {likedTracks.length === 0 ? (
            <p>Список пуст</p>
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
                      }}
                    >
                      #
                    </CustomTableCell>
                    <CustomTableCell
                      style={{
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#b5b5b5",
                        textAlign: "center",
                      }}
                    >
                      Трек
                    </CustomTableCell>
                    <CustomTableCell
                      style={{
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#b5b5b5",
                        textAlign: "center",
                      }}
                    >
                      Время
                    </CustomTableCell>
                    <CustomTableCell
                      style={{
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#b5b5b5",
                        textAlign: "center",
                      }}
                    >
                      Действия
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
                      <CustomTableCell style={{ textAlign: "center" }}>
                        {track.name}
                      </CustomTableCell>
                      <CustomTableCell style={{ textAlign: "center" }}>
                        {msToTime(track.duration_ms)}
                      </CustomTableCell>
                      <CustomTableCell style={{ textAlign: "center" }}>
                        <LikeButton onClick={() => removeFromLikes(track.id)}>
                          Удалить из любимых
                        </LikeButton>
                      </CustomTableCell>
                    </CustomTableRow>
                  ))}
                </TableBody>
              </Table>
            </TrackTable>
          )}
        </Container2>
      </>
      {/* )} */}
    </Container>
  );
};
function msToTime(duration) {
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export default Profile;
