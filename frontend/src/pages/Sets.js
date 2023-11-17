import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Container, Grid, Card, CardMedia, CardContent, Typography, IconButton, Modal, Paper, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import AddIcon from '@mui/icons-material/Add';
import LibraryNav from "../components/LibraryNav";
import CreatePlaylistModal from '../components/CreatePlaylistModal'; 

const Sets = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/playlists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlaylists(response.data);
    } catch (error) {
      console.error("Error loading playlists:", error);
    }
  };

  const handleCreatePlaylist = async (name, imageUrl) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/playlists",
        {
          name: name,
          userId: getUserIdFromToken(),
          imageUrl: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Playlist created successfully:", response.data);

      setShowCreateModal(false);
      loadPlaylists();
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  const handlePlaylistClick = (playlistId) => {
    navigate(`/newplaylist/${playlistId}`);
  };

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }

    const decodedToken = parseJwt(token);
    if (decodedToken) {
      return decodedToken.id;
    }

    return null;
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
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
    <div style={{marginLeft:"40px"}}>
    <div className="library-container">
      <div className="library-nav">
        <LibraryNav/>
      </div>
    </div>
    <Grid container spacing={3}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
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
      </div>
      <div>
      <Grid container spacing={3} style={{ marginTop: '0px', marginLeft: '3px' }}>
            {playlists.map((playlist) => (
              <div
                key={playlist._id}
                className="playlist-item"
                style={{
                  width: "270px",
                  height: "280px",
                  margin: "10px",
                  background: "gray",
                  borderRadius: "10px",
                  alignItems: "center",
                }}
                onClick={() => handlePlaylistClick(playlist._id)} 
              >
              <CardStyled>
                <CardMediaStyled
                  image={playlist.imageUrl} 
                  title={playlist.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div" style={{ textAlign: "center" }}>
                    {playlist.name}
                  </Typography>
                </CardContent>
              </CardStyled>
            </div>
          ))}
        </Grid>
      </div>
    </Grid>
  </div>
  );
};

export default Sets;
