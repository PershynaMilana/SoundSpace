import React, { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  styled,
  Input,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PlayArrowIcon from "@mui/icons-material/PlayArrowRounded";
import ClearIcon from "@mui/icons-material/Clear";
import { app } from '../services/fairbaseConfig';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "100%",
  color: "white",
  background: `linear-gradient(#04009A -70%, #1d1d1d, black)`,
}));

const TrackContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#333",
  },
  width: "100%",
  height: "100%",
  maxHeight: "70px",
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
  marginTop: "70px",
  marginLeft: "20px",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "20px",
    marginLeft: "0",
  },
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

const PlaylistDetails = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginLeft: "20px",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "column",
    marginLeft: "40px",
    alignItems: "flex-start",
  },
}));

const PlaylistDescription = styled(Typography)({
  fontWeight: "600",
  fontSize: "14px",
  color: "#b5b5b5",
});

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

const AlbumDescription = styled(Typography)({
  fontWeight: "600",
  fontSize: "14px",
  color: "#b5b5b5",
  marginTop: "0px",
});

const SearchContainer = styled("div")({
  position: "relative",
  display: "inline-block",
  margin: "16px",
});

const SearchInput = styled(Input)({
  backgroundColor: "#646464",
  decoration: "none",
  opacity: "0.5",
  color: "#c2c2c2",
  paddingLeft: "40px",
  cursor: "pointer",
  width: "500px",
  borderRadius: "5px",
  height: "40px",
  position: "relative",
  transition: "all 0.3s ease-in-out",
  "&:focus": {
    width: "700px",
    borderRadius: "0px",
    borderBottom: "none",
    color: "transparent",
    opacity: "0",
  },
  "&:hover": {
    textDecoration: "none",
    color: "transparent",
  },
  "& .MuiInput-underline:after": {
    borderBottom: "none",
  },
  "& .MuiInputBase-input": {
    "&:hover": {
      textDecoration: "none",
    },
  },
});

const SearchIcon = styled(SearchRoundedIcon)({
  color: "#9b9b9b",
  fontSize: 24,
  position: "absolute",
  left: "12px",
  top: "50%",
  transform: "translateY(-50%)",
});

const ClearIconCustom = styled(ClearIcon)({
  color: "#9b9b9b",
  fontSize: 20,
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
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



const BackToPlaylist = ({ goBack }) => {
  return (
    <ArrowBackIosNewIcon
      onClick={goBack}
      style={{
        color: "white",
        cursor: "pointer",
        position: "absolute",
        top: "167px",
        left: "20px",
        marginRight: "20px",
        zIndex: 1,
      }}
    />
  );
};

const NewPlaylistContent = ({
  loading,
  playlist,
  goBack,
  searchTerm,
  setSearchTerm,
  searchResults,
  searchLoading,
  searchTracks,
  handleRowHover,
  playPauseTrack
}) => {
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const fetchPlaylistTracks = async () => {
    const db = getFirestore(app);
    const tracksCollection = collection(db, 'playlistTracks');
    const tracksSnapshot = await getDocs(tracksCollection);
    const tracksData = tracksSnapshot.docs.map((doc) => doc.data());
    setPlaylistTracks(tracksData);
  };

  useEffect(() => {
    fetchPlaylistTracks();
  }, []);

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim().length >= 2) {
      searchTracks();
    }
  };
  
  const handleClearSearch = () => {
    setSearchTerm("");
  };
 
  const handleAddTrack = async (track) => {
    const db = getFirestore(app);

    try {
      await addDoc(collection(db, 'playlistTracks'), {
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        imageUrl: track.album.images[0].url,
      });
      setPlaylistTracks(prevTracks => [...prevTracks, {
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
      }]);
    } catch (error) {
      console.error('Error adding track to Firestore:', error);
    }
  };
  
  return (
    <Container>
      {loading ? (
        <Typography variant="h5">Loading...</Typography>
      ) : (
        <Grid container spacing={2} style={{ width: "93%" }}>
          <Grid item xs={12}>
            <BackToPlaylist
              goBack={goBack}
              style={{ height: "50px", width: "25px" }}
            />
            <InfoContainer>
              <PlaylistImage
                src={playlist.imageUrl}
                alt={playlist.name}
                style={{ marginRight: "0px" }}
              />
              <PlaylistDetails>
                <Typography
                  variant="h1"
                  style={{
                    marginTop: "220px",
                    fontWeight: "700",
                    color: "white",
                  }}
                >
                  {playlist.name}
                </Typography>
                <PlaylistDescription>
                  {playlist.description}
                </PlaylistDescription>
              </PlaylistDetails>
            </InfoContainer>
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
                    Name
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
                    duration
                  </CustomTableCell>
                  </TableRow>
                </TableHead>
                  <br/>
                  <TableBody>
                  {playlistTracks.map((track, index) => (
                    <CustomTableRow 
                    key={track.id}
          
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
                      </CustomTableCell>
                      <CustomTableCell style={{textAlign:"center"}}>{track.name}</CustomTableCell>
                      <CustomTableCell style={{textAlign:"center"}}>{track.artist}</CustomTableCell>
                      <CustomTableCell style={{textAlign:"center"}}>{track.album}</CustomTableCell>
                    </CustomTableRow>
                  ))}
                </TableBody>
              </Table>
            </TrackTable>
          <Grid item xs={12}>
            <div style={{ marginTop: "20px" }}>
              <SearchContainer>
                <SearchInput
                color="success"
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                  placeholder="Search tracks"
                  style={{ color: "#FFFFFF" }}
                />
                <SearchIcon />
                {searchTerm && (
                  <ClearIconCustom onClick={handleClearSearch} />
                )}
              </SearchContainer>
            </div>
            {searchLoading ? (
              <CircularProgress style={{ marginTop: "20px" }} />
            ) : (
              <div>
                {searchResults.map((track) => (
                  <>
                  <TrackContainer key={track.id} container>
                    <Grid item xs={2}>
                      <TrackImage
                        src={track.album.images[0].url}
                        alt={track.name}
                      />
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
                        <AlbumDescription>
                          {track.album.description}
                        </AlbumDescription>
                        <button onClick={() => handleAddTrack(track)}>
                  Add to Playlist
                </button>
                      </TrackDetails>
                    </Grid>
                  </TrackContainer>
                  <Divider style={{ margin: "15px 0", background: "#555" }} />
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

function msToTime(duration) {
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export default NewPlaylistContent;
