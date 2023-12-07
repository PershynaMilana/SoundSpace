import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useLikes } from "../services/LikesContext";
import { usePlayer } from "../services/PlayerContext";
import PlayArrowIcon from "@mui/icons-material/PlayArrowRounded";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import likeImage from "../assets/images/like.jpg";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Typography,
  Paper,
  styled,
  TableContainer,
  Grid,
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

const LikedTrackImage = styled("img")({
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

const BackToLike = ({ goBack }) => {
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

const Likes = () => {
  const { likedTracks, removeFromLikes } = useLikes();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const { setTrack, currentTrack } = usePlayer();
  const audioPlayerRef = useRef(null);

  useEffect(() => {
    if (audioPlayerRef && audioPlayerRef.current) {
      audioPlayerRef.current.src = currentTrack?.preview_url || "";
    }
  }, [currentTrack, audioPlayerRef]);

  const goBack = () => {
    navigate(-1);
  };

  const handleRowClick = (track) => {
    setCurrentTrackId(track.id);
    setIsPlaying(currentTrackId === track.id ? !isPlaying : true);
    setTrack(track);
  };

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
      <Grid container spacing={2} style={{ width: "93%" }}>
        <BackToLike
          goBack={goBack}
          style={{ height: "100px", width: "100px" }}
        />
        <LikedTrackImage
          src={likeImage}
          alt="Liked Tracks"
          style={{ marginLeft: "40px" }}
        />
        <InfoContainer>
          <Typography
            variant="h1"
            style={{ marginTop: "170px", fontWeight: "700" }}
          >
            Favorite tracks
          </Typography>
        </InfoContainer>
      </Grid>

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
                  <div style={{ textAlign: "center", fontSize: "14px" }}>#</div>
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
                  Actions
                </CustomTableCell>
              </TableRow>
            </TableHead>
            <br />
            <TableBody>
              {likedTracks.map((track, index) => (
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
    </Container>
  );
};

function msToTime(duration) {
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export default Likes;
