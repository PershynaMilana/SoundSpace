
import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PlayArrowIcon from "@mui/icons-material/PlayArrowRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";

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

const AlbumImage = styled("img")({
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

const BackToAlbums = ({ goBack }) => {
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


const AlbumContent = ({
  loading,
  album,
  tracks,
  playPauseTrack,
  handleRowHover,
  goBack,
  addToLikes
}) => {

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


  return (
  <Container>
    {loading ? (
      <Typography variant="h5">Загрузка...</Typography>
    ) : (
      <>
        <Grid container spacing={2} style={{ width: "93%" }}>
          <Grid>
            <BackToAlbums goBack={goBack} style={{ height: "100px", width: "100px" }} />
            <AlbumImage 
            src={album.images[0].url} 
            alt={album.name} 
            style={{ marginLeft: "40px" }} />
          </Grid>
          <Grid>
            <InfoContainer>
              <Typography
                variant="h1"
                style={{
                  marginTop: "170px",
                  marginLeft: "35px",
                  fontWeight: "700",
                }}
              >
                {album.name}
              </Typography>
              <Typography
                variant="body1"
                style={{ fontWeight: "600", marginLeft: "35px" }}
              >
                Исполнитель: {album.artists.map((artist) => artist.name).join(", ")}
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
                  Длительность
                </CustomTableCell>
                <CustomTableCell
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#b5b5b5",
                    }}
                  >
                    Лайк
                  </CustomTableCell>
              </TableRow>
            </TableHead>
            <br />
            <TableBody>
              {tracks.map((track, index) => (
                <CustomTableRow
                  key={track.id}
                  onMouseEnter={() => handleRowHover(index)}
                  onMouseLeave={() => handleRowHover(-1)}
                  onClick={() => playPauseTrack(track)}
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
                    {msToTime(track.duration_ms)}
                  </CustomTableCell>
                  <CustomTableCell>
                      <FavoriteIcon
                        style={{
                          color: likedTracks.some(
                            (likedTrack) => likedTrack.id === track.id
                          )
                            ? "red"
                            : "white",
                          cursor: "pointer",
                        }}
                        onClick={(e) => handleLikeClick(e,track)}
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

export default AlbumContent;
