// OverviewContent.js
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import PlayArrowIcon from "@mui/icons-material/PlayArrowRounded";
import LibraryNav from "../components/LibraryNav";

import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    styled,
    CircularProgress,
    Table,
    TableBody,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    Paper,
    Divider,
} from "@mui/material";


const Container = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    minHeight: "100vh",
    color: "white",
  
    overflow: "hidden",
  }));
  
  const Container2 = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    minHeight: "auto",
    color: "white",
    background: `transperent`,
    overflow: "hidden",
  }));
  
  const SectionContainer = styled("div")({
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    margin: "0 auto",
    "& > *": {
      flex: "0 0 calc(14.285% - 20px)",
      margin: "10px",
    },
  });
  
  const TrackImage = styled(CardMedia)(({ theme }) => ({
    width: "50px",
    height: "50px",
    borderRadius: "5px",
  }));
  
  const TrackTable = styled(TableContainer)(({ theme }) => ({
    width: "90%",
    backgroundColor: "transparent",
    boxShadow: "none",
  }));
  
  const CustomTableRow = styled(TableRow)(({ theme, currentTrackId, track }) => ({
    backgroundColor: currentTrackId === track.id ? "#333" : "transparent",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#333",
      "& .playIcon": {
        visibility: "visible",
      },
      "& .customTableCells": {
        visibility: "hidden",
      },
    },
  }));
  
  const CustomTableCell = styled(TableCell)(({ theme }) => ({
    color: "white",
    borderBottom: "none",
    position: "relative",
    textAlign: "center",
  }));
  
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
  
  const PlayIcon = styled(PlayArrowIcon)({
    position: "relative",
    top: "30%",
    left: "8%",
    height: "25px",
    width: "25px",
    color: "white",
    cursor: "pointer",
    visibility: "hidden",
  });

  const CardStyled = styled(Card)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
    cursor: "pointer",
  }));

  const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
    width: "100%",
    height: 0,
    paddingTop: "56.25%",
  }));

const OverviewContent = ({
  loading,
  latestTracks,
  trackIndex,
  playlists,
  playlistIndex,
  likedTracks,
  handlePrevTrack,
  handleNextTrack,
  handlePrevPlaylist,
  handleNextPlaylist,
  handleTrackClick,
  handlePlaylistClick,
  removeFromLikes,
  isPlaying,
  currentTrackId,
  handleRowHover,
  lastFiveLikedTracks,
  handleRowClick
}) => {
    const navigate = useNavigate();
    return (
        <div style={{ marginLeft: "40px", maxWidth: "1640px" }}>
          <div className="library-container">
            <div className="library-nav">
              <LibraryNav />
            </div>
          </div>
          <Divider
            style={{
              marginBottom: "50px",
              marginRight: "40px",
              background: "#555",
              margin: "0 auto",
            }}
          />
    
          <Container>
            {loading ? (
              <Typography variant="h5" style={{ marginTop: "300px" }}>
                Loading...
              </Typography>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "88%",
                    marginTop: "70px",
                  }}
                >
                  <Typography
                    variant="h4"
                    style={{
                      fontWeight: "700",
                      alignSelf: "flex-start",
                    }}
                  >
                    Listening history
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      alignSelf: "flex-end",
                    }}
                  >
                    <IconButton
                      style={{
                        color: "white",
                        cursor: "pointer",
                      }}
                      onClick={handlePrevTrack}
                      disabled={trackIndex === 0}
                    >
                      <ArrowBackIosNewRoundedIcon />
                    </IconButton>
                    <IconButton
                      style={{
                        color: "white",
                        cursor:
                        trackIndex + 6 >= latestTracks.length
                            ? "not-allowed"
                            : "pointer",
                        opacity: trackIndex + 6 >= latestTracks.length ? 0.5 : 1,
                      }}
                      onClick={handleNextTrack}
                      disabled={trackIndex + 6 >= latestTracks.length}
                    >
                      <ArrowForwardIosRoundedIcon />
                    </IconButton>
                  </div>
                </div>
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "15px",
                    }}
                  >
                    <CircularProgress style={{ color: "gray" }} />
                  </div>
                ) : (
                  <SectionContainer
                    container
                    spacing={3}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      marginTop: "10px",
                      marginLeft: "90px",
                    }}
                  >
                    {latestTracks
                      .slice(trackIndex, trackIndex + 6)
                      .map((playlist) => (
                        <div onClick={() => handleTrackClick(playlist.album.id)}>
                          <CardStyled
                            style={{
                              background: "#222222",
                              color: "white",
                              width: "100%",
                              height: "260px",
                              margin: "10px",
                              alignItems: "left",
                            }}
                          >
                            <CardMediaStyled
                              image={playlist.album?.images[0]?.url}
                              title={playlist.name}
                              description={playlist.description}
                            />
                            <CardContent>
                              <Typography
                                variant="h6"
                                component="div"
                                style={{ textAlign: "center" }}
                              >
                                {playlist.name}
                              </Typography>
                              <Typography
                                variant="p"
                                component="div"
                                style={{ textAlign: "center", color: "#afafaf" }}
                              >
                                {playlist.artists[0].name}
                              </Typography>
                            </CardContent>
                          </CardStyled>
                        </div>
                      ))}
                  </SectionContainer>
                )}
    
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "88%",
                    marginTop: "70px",
                  }}
                >
                  <Typography
                    variant="h4"
                    style={{
                      fontWeight: "700",
                      alignSelf: "flex-start",
                    }}
                  >
                    Your playlists
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      alignSelf: "flex-end",
                    }}
                  >
                    <IconButton
                      style={{
                        color: "white",
                        cursor: "pointer",
                      }}
                      onClick={handlePrevPlaylist}
                      disabled={playlistIndex === 0}
                    >
                      <ArrowBackIosNewRoundedIcon />
                    </IconButton>
                    <Link
                      onClick={() => navigate("/library/sets")}
                      to="/library/sets"
                      variant="outlined"
                      color="primary"
                      style={{
                        marginTop: "10px",
                        textDecoration: "none",
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "600",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Show all
                    </Link>
                    <IconButton
                      style={{
                        color: "white",
                        cursor:
                          playlistIndex + 6 >= playlists.length
                            ? "not-allowed"
                            : "pointer",
                        opacity: playlistIndex + 6 >= playlists.length ? 0.5 : 1,
                      }}
                      onClick={handleNextPlaylist}
                      disabled={playlistIndex + 6 >= playlists.length}
                    >
                      <ArrowForwardIosRoundedIcon />
                    </IconButton>
                  </div>
                </div>
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "15px",
                    }}
                  >
                    <CircularProgress style={{ color: "gray" }} />
                  </div>
                ) : (
                  <SectionContainer
                    container
                    spacing={3}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      marginTop: "10px",
                      marginLeft: "90px",
                    }}
                  >
                    {playlists
                      .slice(playlistIndex, playlistIndex + 6)
                      .map((playlist) => (
                        <div onClick={() => handlePlaylistClick(playlist._id)}>
                          <CardStyled
                            style={{
                              background: "#222222",
                              color: "white",
                              width: "100%",
                              height: "280px",
                              margin: "10px",
                              alignItems: "left",
                            }}
                          >
                            <CardMediaStyled
                              image={playlist.imageUrl}
                              title={playlist.name}
                              description={playlist.description}
                            />
                            <CardContent>
                              <Typography
                                variant="h6"
                                component="div"
                                style={{ textAlign: "center" }}
                              >
                                {playlist.name}
                              </Typography>
                              <Typography
                                variant="p"
                                component="div"
                                style={{ textAlign: "center", color: "#afafaf" }}
                              >
                                {playlist.description}
                              </Typography>
                            </CardContent>
                          </CardStyled>
                        </div>
                      ))}
                  </SectionContainer>
                )}
    
                <Container2>
                  <Typography
                    variant="h4"
                    style={{
                      fontWeight: "700",
                      alignSelf: "flex-start",
                      marginLeft: "80px",
                      marginTop: "70px",
                    }}
                  >
                    Your liked tracks
                  </Typography>
                  {likedTracks.length === 0 ? (
                    <p>The list is empty</p>
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
                                textAlign: "center",
                              }}
                            >
                              <div
                                style={{ textAlign: "center", fontSize: "14px" }}
                              >
                                #
                              </div>
                            </CustomTableCell>
                            <CustomTableCell
                              style={{
                                fontSize: "14px",
                                fontWeight: "700",
                                color: "#b5b5b5",
                                textAlign: "left",
                                marginLeft: "20px",
                              }}
                            >
                              Track
                            </CustomTableCell>
                            <CustomTableCell
                              style={{
                                fontSize: "14px",
                                fontWeight: "700",
                                color: "#b5b5b5",
                                textAlign: "left",
                                marginLeft: "230px",
                                display: "flex",
                                alignItems: "right",
                              }}
                            >
                              Album
                            </CustomTableCell>
                            <CustomTableCell
                              style={{
                                fontSize: "14px",
                                fontWeight: "700",
                                color: "#b5b5b5",
                                textAlign: "right",
                              }}
                            ></CustomTableCell>
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
                                textAlign: "center",
                              }}
                            >
                              Actions
                            </CustomTableCell>
                          </TableRow>
                        </TableHead>
                        <br />
                        <TableBody>
                          {lastFiveLikedTracks.map((track, index) => (
                            <CustomTableRow
                              key={track.id}
                              onMouseEnter={() => handleRowHover(index)}
                              onMouseLeave={() => handleRowHover(-1)}
                              onClick={() => handleRowClick(track)}
                              currentTrackId={currentTrackId}
                              track={track}
                            >
                              <CustomTableCell
                                style={{
                                  borderRadius: "5px 0px 0px 5px",
                                  color: "#b5b5b5",
                                  padding: "0px",
                                  position: "relative",
                                }}
                              >
                                <div
                                  className="customTableCells"
                                  style={{
                                    width: "50px",
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                  }}
                                >
                                  {index + 1}
                                </div>
                                <PlayIcon className="playIcon" />
                              </CustomTableCell>
                              <CustomTableCell
                                style={{ display: "flex", alignItems: "left" }}
                              >
                                <TrackImage
                                  image={track.album.images[0]?.url}
                                  title={track.name}
                                  style={{ marginRight: "8px" }}
                                />
                                <div>
                                  <div
                                    style={{
                                      fontSize: "16px",
                                      marginTop: "4px",
                                      marginLeft: "6px",
                                      color:
                                        isPlaying && currentTrackId === track.id
                                          ? "#1DB954"
                                          : "white",
                                    }}
                                  >
                                    {track.name}
                                  </div>
                                  <div
                                    style={{
                                      color: "#afafaf",
                                      fontSize: "14px",
                                      textAlign: "left",
                                    }}
                                  >
                                    <LikeButton>
                                      <Link
                                        to={`/artist/${track.artists[0].id}`}
                                        style={{
                                          textDecoration: "none",
                                          color: "inherit",
                                          textAlign: "left",
                                          "&:hover": {
                                            textDecoration: "underline",
                                            color: "#1DB954",
                                          },
                                        }}
                                      >
                                        {track.artists[0].name}
                                      </Link>
                                    </LikeButton>
                                  </div>
                                </div>
                              </CustomTableCell>
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
                              <CustomTableCell></CustomTableCell>
                              <CustomTableCell style={{ textAlign: "center" }}>
                                {msToTime(track.duration_ms)}
                              </CustomTableCell>
                              <CustomTableCell
                                style={{
                                  textAlign: "center",
                                  borderRadius: "0px 5px 5px 0px",
                                }}
                              >
                                <LikeButton
                                  onClick={() => removeFromLikes(track.id)}
                                >
                                  Delete from likes
                                </LikeButton>
                              </CustomTableCell>
                            </CustomTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TrackTable>
                  )}
                </Container2>
              </>
            )}
          </Container>
        </div>
      );
    };

    function msToTime(duration) {
        const minutes = Math.floor(duration / 60000);
        const seconds = ((duration % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
      }

export default OverviewContent;
