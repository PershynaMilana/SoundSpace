import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import { useRef } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrowRounded";
import { usePlayer } from "../../../services/PlayerContext";
const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "100%",
  color: "white",
  background: `linear-gradient(#04009A -70%, #1d1d1d, black)`,
}));

const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
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
  left: "34%",
  height: "25px",
  width: "25px",
  color: "white",
  cursor: "pointer",
  visibility: "hidden",
});

const TrackTab = ({ trackResults }) => {
  const handleRowHover = (index) => {
    const playIcons = document.getElementsByClassName("playIcon");
    const customTableCells = document.getElementsByClassName("customTableCell");
    for (let i = 0; i < playIcons.length; i++) {
      playIcons[i].style.visibility = i === index ? "visible" : "hidden";
      customTableCells[i].style.visibility = i === index ? "hidden" : "visible";
    }
  };
  const { setTrack, currentTrack } = usePlayer();
  const audioPlayerRef = useRef(null);
  const playTrack = (track) => {
    setTrack(track);
  };
  return (
    <Container style={{ background: "transparent" }}>
      <CustomTableContainer component={Paper}>
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
                <div style={{ marginLeft: "40px", fontSize: "14px" }}>#</div>
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
                  textAlign: "center",
                }}
              >
                Duration
              </CustomTableCell>
            </TableRow>
          </TableHead>
          <br />
          <TableBody>
            {trackResults.map((track, index) => (
              <CustomTableRow
                key={track.id}
                onMouseEnter={() => handleRowHover(index)}
                onMouseLeave={() => handleRowHover(-1)}
                onClick={() => playTrack(track)}
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
                <CustomTableCell>{track.name}</CustomTableCell>
                <CustomTableCell>{track.album.name}</CustomTableCell>
                <CustomTableCell
                  style={{
                    borderRadius: "0px 5px 5px 0px",
                    textAlign: "center",
                  }}
                >
                  {msToTime(track.duration_ms)}
                </CustomTableCell>
              </CustomTableRow>
            ))}
          </TableBody>
        </Table>
      </CustomTableContainer>
    </Container>
  );
};

function msToTime(duration) {
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export default TrackTab;
