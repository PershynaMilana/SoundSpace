import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PlayArrowIcon from "@mui/icons-material/PlayArrowRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { app } from "../services/fairbaseConfig";
import { getFirestore } from "firebase/firestore";
import { useLikes } from "../services/LikesContext";

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

const db = getFirestore(app);

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
  position: "relative",
  top: "30%",
  left: "40%",
  height: "25px",
  width: "25px",
  color: "white",
  cursor: "pointer",
  visibility: "hidden",
});

const BackToPlaylist = ({ goBack }) => {
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

const PlaylistContent = ({
  loading,
  playlist,
  tracks,
  playPauseTrack,
  handleRowHover,
  goBack,
}) => {
  const { likedTracks, addToLikes, removeFromLikes } = useLikes();
  const [localLikedTracks, setLocalLikedTracks] = useState([]);

  useEffect(() => {
    if (!loading) {
      setLocalLikedTracks(likedTracks || []);
    }
  }, [loading, likedTracks]);

  const isTrackLiked = (trackId) => {
    return localLikedTracks.some((likedTrack) => likedTrack.id === trackId);
  };

  const handleLikeClick = async (e, track) => {
    e.stopPropagation();
    track.isLiked = !track.isLiked;
    if (track.isLiked) {
      if (!isTrackLiked(track.id)) {
        setLocalLikedTracks((prevLikedTracks) => [...prevLikedTracks, track]);
        addToLikes(track);
      }
    } else {
      setLocalLikedTracks((prevLikedTracks) =>
        prevLikedTracks.filter((likedTrack) => likedTrack.id !== track.id)
      );
      removeFromLikes(track.id);
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
          <Grid container spacing={2} style={{ width: "93%" }}>
            <Grid>
              <BackToPlaylist
                goBack={goBack}
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
                  style={{ marginTop: "170px", fontWeight: "700" }}
                >
                  {playlist.name}
                </Typography>
                <Typography variant="body1" style={{ fontWeight: "600" }}>
                  {playlist.description}
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
                      marginLeft: "50px",
                    }}
                  >
                    <div style={{ marginLeft: "40px", fontSize: "14px" }}>
                      #
                    </div>
                  </CustomTableCell>
                  <CustomTableCell
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#b5b5b5",
                    }}
                  >
                    Track
                  </CustomTableCell>
                  <CustomTableCell
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#b5b5b5",
                    }}
                  >
                    Album
                  </CustomTableCell>
                  <CustomTableCell
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#b5b5b5",
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
                    }}
                  >
                    Like
                  </CustomTableCell>
                </TableRow>
              </TableHead>
              <br />
              <TableBody>
                {tracks.map((track, index) => (
                  <CustomTableRow
                    key={track.track.id}
                    onMouseEnter={() => handleRowHover(index)}
                    onMouseLeave={() => handleRowHover(-1)}
                    onClick={() => playPauseTrack(track.track)}
                  >
                    <CustomTableCell
                      style={{
                        borderRadius: "5px 0px 0px 5px",
                        color: "#b5b5b5",
                        padding: "0px",
                        marginLeft: "50px",
                        position: "relative",
                      }}
                    >
                      <div
                        className="customTableCell"
                        style={{
                          marginLeft: "50px",
                          top: "30%",
                          position: "absolute",
                        }}
                      >
                        {index + 1}
                      </div>
                      <PlayIcon
                        className="playIcon"
                        style={{
                          marginRight: "60px",
                          padding: "0px",
                          position: "absolute",
                        }}
                      />
                    </CustomTableCell>
                    <CustomTableCell>{track.track.name}</CustomTableCell>
                    <CustomTableCell>
                      <LikeButton>
                        <Link
                          to={`/album/${track.track.album.id}`}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            "&:hover": {
                              textDecoration: "underline",
                              color: "#1DB954",
                            },
                          }}
                        >
                          {track.track.album.name}
                        </Link>
                      </LikeButton>
                    </CustomTableCell>
                    <CustomTableCell>
                      <LikeButton>
                        <Link
                          to={`/artist/${track.track.artists[0].id}`}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            "&:hover": {
                              textDecoration: "underline",
                              color: "#1DB954",
                            },
                          }}
                        >
                          {track.track.artists[0].name}
                        </Link>
                      </LikeButton>
                    </CustomTableCell>
                    <CustomTableCell
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {msToTime(track.track.duration_ms)}
                    </CustomTableCell>
                    <CustomTableCell
                      style={{
                        borderRadius: "0px 5px 5px 0px",
                      }}
                    >
                      <FavoriteIcon
                        style={{
                          color: isTrackLiked(track.track.id)
                            ? "#1DB954"
                            : "white",
                          cursor: "pointer",
                        }}
                        onClick={(e) => handleLikeClick(e, track.track)}
                      />
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

export default PlaylistContent;
