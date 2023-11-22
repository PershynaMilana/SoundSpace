import React from "react";
import {
  Typography,
  Grid,
  styled,
  Input,
  CircularProgress,
  Container
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";


const TrackContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "10px",
  borderBottom: "1px solid #333",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#333",
  },
  width: "100%",
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

const NewPlaylistContent = ({
  loading,
  playlist,
  goBack,
  searchTerm,
  setSearchTerm,
  searchResults,
  searchLoading,
  searchTracks,
}) => {
  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim().length >= 2) {
      searchTracks();
    }
  };

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

  return (
    <Container>
      {loading ? (
        <Typography variant="h5">Загрузка...</Typography>
      ) : (
        <Grid container spacing={2} style={{ width: "93%" }}>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <InfoContainer>
              <Typography
                variant="h1"
                style={{
                  marginTop: "170px",
                  fontWeight: "700",
                  color: "white"
                }}
              >
                {playlist.name}
              </Typography>
              <Typography
                variant="body1"
                style={{ fontWeight: "600" }}
              ></Typography>
            </InfoContainer>
            <div style={{ marginTop: "20px", border: "1px solid white", borderRadius: "5px", background: "white", padding: "5px" }}>
              <Input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Поиск треков"
                style={{ width: "100%", border: "none", outline: "none", background: "transparent" }}
              />
            </div>
            {searchLoading ? (
              <CircularProgress style={{ marginTop: "20px" }} />
            ) : (
              <div>
                {searchResults.map((track) => (
                  <TrackContainer key={track.id} container>
                    <Grid item xs={2}>
                      <TrackImage src={track.album.images[0].url} alt={track.name} />
                    </Grid>
                    <Grid item xs={6}>
                      <TrackInfo>
                        <TrackName>{track.name}</TrackName>
                        <ArtistName>{track.artists[0].name}</ArtistName>
                      </TrackInfo>
                    </Grid>
                    <Grid item xs={4}>
                      <TrackDetails>
                        <AlbumName>{track.album.name}</AlbumName>
                      </TrackDetails>
                    </Grid>
                  </TrackContainer>
                ))}
              </div>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default NewPlaylistContent;
