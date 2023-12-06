import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import LibraryNav from "../components/LibraryNav";
import CreatePlaylistModal from "../components/CreatePlaylistModal";
import ClearIcon from "@mui/icons-material/Clear";

const Sets = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = getCookie("auth_token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      loadPlaylists();
    }
  }, [token]);

  const loadPlaylists = async () => {
    try {
      const decodedToken = parseJwt(token);
      console.log("Decoded Token:", decodedToken);
      console.log("Token:", token);
      const response = await axios.get("http://localhost:8080/api/playlists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId:decodedToken.id
        }
      });
      setPlaylists(response.data);
    } catch (error) {
      console.error("Error loading playlists:", error);
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const handleCreatePlaylist = async (name, imageUrl, description) => {
    try {
      const decodedToken = parseJwt(token);
      const userId = decodedToken ? decodedToken.id : null;

      if (!userId) {
        console.error("User ID not found in the decoded token.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/api/playlists",
        {
          userId: userId,
          name: name,
          imageUrl: imageUrl,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowCreateModal(false);
      loadPlaylists();
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  const handleDeletePlaylist = async (playlistId) => {
    try {
      await axios.delete(`http://localhost:8080/api/playlists/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await loadPlaylists();
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const handlePlaylistClick = (playlistId) => {
    navigate(`/newplaylist/${playlistId}`);
  };

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

  const createPlaylistButtonStyle = {
    width: "270px",
    height: "280px",
    margin: "10px",
    background: "gray",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

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
        }}
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={3}
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            <Grid item>
              <IconButton
                className="playlist-item"
                onClick={() => setShowCreateModal(true)}
                style={createPlaylistButtonStyle}
              >
                <AddIcon />
              </IconButton>
              {showCreateModal && (
                <CreatePlaylistModal
                  open={showCreateModal}
                  onClose={() => setShowCreateModal(false)}
                  onCreatePlaylist={handleCreatePlaylist}
                />
              )}
            </Grid>
            {playlists.map((playlist) => (
              <Grid
                key={playlist._id}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                style={{ maxWidth: "260px" }}
              >
                <div onClick={() => handlePlaylistClick(playlist._id)}>
                  <CardStyled
                    style={{
                      background: "#222222",
                      color: "white",
                      width: "100%",
                      height: "280px",
                      margin: "10px",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      style={{
                        position: "absolute",
                        top: "0px",
                        right: "0px",
                        color: "#FFFFFF",
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDeletePlaylist(playlist._id);
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                    {playlist && (
                      <React.Fragment>
                        <CardMediaStyled
                          image={playlist.imageUrl || ""}
                          title={playlist.name || ""}
                          description={playlist.description || ""}
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
                            variant="h6"
                            component="div"
                            style={{ textAlign: "center" }}
                          >
                            {playlist.description}
                          </Typography>
                        </CardContent>
                      </React.Fragment>
                    )}
                  </CardStyled>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Sets;
