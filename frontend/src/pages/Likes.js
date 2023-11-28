import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  Grid
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
  const { setTrack, currentTrack } = usePlayer();
  const audioPlayerRef = useRef(null);
  const navigate = useNavigate();


  const playTrack = (track) => {
    setTrack(track);
  };

  useEffect(() => {
    if (audioPlayerRef && audioPlayerRef.current) {
      audioPlayerRef.current.src = currentTrack?.preview_url || "";
    }
  }, [currentTrack, audioPlayerRef]);

  const goBack = () => {
    navigate(-1);
  };

  const handleRowHover = (index) => {
    const playIcons = document.getElementsByClassName("playIcon");
    const customTableCells = document.getElementsByClassName("customTableCell");
    for (let i = 0; i < playIcons.length; i++) {
      playIcons[i].style.visibility = i === index ? "visible" : "hidden";
      customTableCells[i].style.visibility = i === index ? "hidden" : "visible";
    }
  };


  return (
    <Container>
      <Grid container spacing={2} style={{ width: "93%" }}>
      <BackToLike goBack={goBack} style={{ height: "100px", width: "100px" }} />
        <LikedTrackImage src={likeImage} alt="Liked Tracks" style={{ marginLeft: "40px" }}/>
        <InfoContainer>
          <Typography variant="h1"
            style={{ marginTop: "170px", fontWeight: "700" }}
          >Любимые треки</Typography>
        </InfoContainer>
      </Grid>

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
                >#</CustomTableCell>
                <CustomTableCell
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#b5b5b5",
                    textAlign: "center",
                  }}
                >Трек</CustomTableCell>
                <CustomTableCell
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#b5b5b5",
                    textAlign: "center",
                  }}
                >Время</CustomTableCell>
                <CustomTableCell
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#b5b5b5",
                    textAlign: "center",
                  }}
                >Действия</CustomTableCell>
              </TableRow>
            </TableHead>
            <br />
            <TableBody>
              {likedTracks.map((track, index) => (
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
                  <CustomTableCell style={{textAlign:"center"}}>{track.name}</CustomTableCell>
                  <CustomTableCell style={{textAlign:"center"}}>{msToTime(track.duration_ms)}</CustomTableCell>
                  <CustomTableCell style={{textAlign:"center"}}>
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
    </Container>
  );
};

function msToTime(duration) {
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export default Likes;