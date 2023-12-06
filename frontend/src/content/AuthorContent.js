import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  Card,
  CardMedia,
  CardContent,
  Tab,
  Tabs,
  Divider,
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

const CardStyled = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
  width: "105%",
  backgroundColor: "#333333",
  color: "white",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
  width: "100%",
  height: 0,
  paddingTop: "56.25%",
  marginLeft: "20px",
  marginRight: "20px",
}));

const ArtistImage = styled("img")({
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
  left: "20%",
  height: "25px",
  width: "25px",
  color: "white",
  cursor: "pointer",
  visibility: "hidden",
});

const BackToArtists = ({ goBack }) => {
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

const AuthorContent = ({
  loading,
  artist,
  topTracks,
  displayedTracks,
  handleRowHover,
  playTrack,
  expanded,
  toggleTracks,
  selectedTab,
  albums,
  artists,
  handleAlbumClick,
  handleArtistClick,
  handleClick,
  goBack,
  addToLikes,
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
        <Typography variant="h5" style={{ marginTop: "300px" }}>
          Loading...
        </Typography>
      ) : (
        <>
          <Grid container spacing={2} style={{ width: "93%" }}>
            <Grid item>
              <BackToArtists
                goBack={goBack}
                style={{ height: "100px", width: "100px" }}
              />
              <ArtistImage
                src={artist.images[0].url}
                alt={artist.name}
                style={{ marginLeft: "40px" }}
              />
            </Grid>
            <Grid item>
              <InfoContainer>
                <Typography
                  variant="h1"
                  style={{
                    marginTop: "170px",
                    marginLeft: "35px",
                    fontWeight: "700",
                  }}
                >
                  {artist.name}
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    fontWeight: "600",
                    marginLeft: "35px",
                  }}
                >
                  Popularity: {artist.popularity}
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
                      textAlign: "center",
                    }}
                  >
                    Popularity
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
              <div style={{ height: "20px" }}></div>
              <TableBody style={{ paddingTop: "20px" }}>
                {topTracks.slice(0, displayedTracks).map((track, index) => (
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
                    <CustomTableCell>
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
                    <CustomTableCell
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {track.popularity}
                    </CustomTableCell>
                    <CustomTableCell
                      style={{ borderRadius: "0px 5px 5px 0px" }}
                    >
                      <FavoriteIcon
                        style={{
                          color: likedTracks.some(
                            (likedTrack) => likedTrack.id === track.id
                          )
                            ? "#1DB954"
                            : "white",
                          cursor: "pointer",
                        }}
                        onClick={(e) => handleLikeClick(e, track)}
                      />
                    </CustomTableCell>
                  </CustomTableRow>
                ))}
              </TableBody>
            </Table>
          </TrackTable>
          {topTracks.length > 5 && (
            <div
              style={{
                textAlign: "right",
                marginTop: "20px",
                width: "100%",
              }}
            >
              <div>
                <button
                  onClick={toggleTracks}
                  style={{
                    background: "#333333",
                    paddingLeft: "25px",
                    paddingRight: "25px",
                    paddingTop: "7px",
                    paddingBottom: "7px",
                    borderRadius: "50px",
                    fontFamily: "Verdana",
                    border: "none",
                    color: "#888",
                    cursor: "pointer",
                    transition: "color 0.3s ease-in-out",
                    fontWeight: "500",
                    marginRight: "150px",
                    marginTop: "30px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "white";
                    e.target.style.background = "#404040";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#888";
                    e.target.style.background = "#333333";
                  }}
                >
                  {expanded ? "Collapse" : "More"}
                </button>
              </div>
            </div>
          )}
          <div style={{ marginTop: "20px", width: "100%" }}>
            <Tabs
              value={selectedTab}
              onChange={(event, newValue) => handleClick(newValue)}
              centered={false}
              sx={{
                justifyContent: "flex-start",
                marginLeft: "80px",
                color: "white",
                "& .MuiTabs-indicator": {
                  backgroundColor: "transparent",
                  color: "white",
                },
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontFamily: "Verdana",
                  color: "white",
                  borderRadius: "50px",
                  padding: "10px 20px",
                  margin: "5px",
                  fontWeight: "600",
                },
                "& .Mui-selected": {
                  backgroundColor: "#333333",
                  color: "white",
                },
              }}
            >
              <Tab
                label="Albums"
                value="albums"
                style={{ fontWeight: "500", color: "white" }}
              />
              <Tab
                label="Related artists"
                value="artists"
                style={{ fontWeight: "500", color: "white" }}
              />
            </Tabs>
          </div>
          <Divider style={{ margin: "15px 0", background: "#555" }} />
          <div
            style={{
              color: "white",
              fontFamily: "Verdana",
              marginTop: "30px",
              width: "90%",
              fontWeight: "500",
              padding: "0px",
              margin: "0 auto",
            }}
          >
            {selectedTab === "albums" && (
              <div>
                <div
                  style={{
                    color: "white",
                    fontFamily: "Verdana",
                    marginTop: "30px",
                    width: "100%",
                    fontWeight: "500",
                    padding: "0px",
                    margin: "0 auto",
                  }}
                >
                  {albums && (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                        }}
                      >
                        {albums.map((album) => (
                          <div
                            key={album.id}
                            className="album-item"
                            style={{
                              width: "230px",
                              height: "250px",
                              borderRadius: "10px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              margin: "10px",
                            }}
                            onClick={() => handleAlbumClick(album.id)}
                          >
                            {album.images[0] && (
                              <CardStyled>
                                <CardMediaStyled
                                  image={album.images[0].url}
                                  title={album.name}
                                />
                                <CardContent>
                                  <Typography
                                    variant="h6"
                                    component="div"
                                    style={{
                                      textAlign: "center",
                                    }}
                                  >
                                    {album.name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    component="div"
                                    style={{
                                      textAlign: "center",
                                    }}
                                  >
                                    by {album.artists[0].name}
                                  </Typography>
                                </CardContent>
                              </CardStyled>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedTab === "artists" && (
              <div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {artists.map((artist) => (
                    <div
                      key={artist.id}
                      className="artist-item"
                      style={{
                        width: "230px",
                        height: "250px",
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "10px",
                      }}
                      onClick={() => handleArtistClick(artist.id)}
                    >
                      {artist.images[0] && (
                        <CardStyled>
                          <CardMediaStyled
                            image={artist.images[0].url}
                            title={artist.name}
                          />
                          <CardContent>
                            <Typography
                              variant="h6"
                              component="div"
                              style={{
                                textAlign: "center",
                              }}
                            >
                              {artist.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              component="div"
                              style={{
                                textAlign: "center",
                              }}
                            >
                              Subscribers: {artist.followers.total}
                            </Typography>
                          </CardContent>
                        </CardStyled>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </Container>
  );
};

export default AuthorContent;
