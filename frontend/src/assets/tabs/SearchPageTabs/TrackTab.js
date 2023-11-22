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

const TrackTab = ({ trackResults }) => {
  return (
    <Container>
      <CustomTableContainer component={Paper}>
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
                }}
              >
                Название альбома
              </CustomTableCell>
              <CustomTableCell
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#b5b5b5",
                  textAlign: "center",
                }}
              >
                Время трека
              </CustomTableCell>
            </TableRow>
          </TableHead>
          <br />
          <TableBody>
            {trackResults.map((track, index) => (
              <CustomTableRow key={track.id}>
                <CustomTableCell
                  style={{
                    borderRadius: "5px 0px 0px 5px",
                    color: "#b5b5b5",
                    padding: "0px",
                  }}
                >
                  {index + 1}
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
