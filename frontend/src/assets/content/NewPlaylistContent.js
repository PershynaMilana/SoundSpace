import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Typography, Grid, styled } from "@mui/material";

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

const BackToPlaylist = styled(ArrowBackIosNewIcon)({
  color: "white",
  cursor: "pointer",
  position: "absolute",
  top: "137px",
  left: "20px",
  marginRight: "20px",
  zIndex: 1,
});

const NewPlaylistContent = ({ loading, playlist, goBack }) => {
  return (
    <Container>
      {loading ? (
        <Typography variant="h5">Загрузка...</Typography>
      ) : (
        <Grid container spacing={2} style={{ width: "93%" }}>
          <Grid>
            <BackToPlaylist
              onClick={goBack}
              style={{ height: "50px", width: "25px" }}
            />
            <PlaylistImage
              src={playlist.imageUrl}
              alt={playlist.name}
              style={{ marginLeft: "40px" }}
            />
          </Grid>
          <Grid>
            <InfoContainer>
              <Typography
                variant="h1"
                style={{
                  marginTop: "100px",
                  fontWeight: "700",
                }}
              >
                {playlist.name}
              </Typography>
              <Typography
                variant="body1"
                style={{ fontWeight: "600" }}
              >
              </Typography>
            </InfoContainer>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default NewPlaylistContent;
