import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Grid,
  styled,
  Input,
  CircularProgress,
  Container,
  Divider
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const TrackContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "10px",
  borderRadius:"5px",
  boxShadow:"none",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#333",
  },
  width: "100%",
  margin: "0 auto",
}));

const PlaylistImage = styled("img")({
  marginBottom: "20px",
  width: "300px",
  height: "300px",
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

const PlaylistName = styled(Typography)({
  marginTop: "0px",
  fontWeight: "700",
  color: "white",
  marginLeft: "20px",
});

const SearchInput = styled(Input)({
  width: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
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
  const BackToArtists = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <ArrowBackIosNewIcon
            onClick={goBack}
            style={{
                color: "white",
                cursor: "pointer",
                position: "absolute",
                top: "150px",
                left: "170px",
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
            <Grid container alignItems="center" style={{marginBottom:"20px"}}>
              <BackToArtists
                style={{ height: "50px", width: "35px", marginLeft: "170px"}}
              />
                <PlaylistImage
              src={playlist.imageUrl}
              alt={playlist.name}
              style={{ marginLeft: "40px" }}
            />
                <Typography
                variant="h1"
                style={{                  
                  fontWeight: "700",
                  color: "white", 
                  marginTop: "280px",
                  marginLeft: "20px"
                }}
              >
                {playlist.name}
              </Typography>
            </Grid>
            <div style={{ marginTop: "20px", marginBottom: "20px", border: "1px solid white", borderRadius: "5px", background: "white", padding: "5px" }}>
              <SearchInput
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Поиск треков"
              />
            </div>
            {searchLoading ? (
              <CircularProgress style={{ marginTop: "20px" }} />
            ) : (
              <div>
                {searchResults.map((track) => (
                  <>
                  <TrackContainer key={track.id} container style={{marginTop:"0px"}}>
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
                  <Divider style={{ margin: "10px", background: "#555" }} />
                  </>
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
