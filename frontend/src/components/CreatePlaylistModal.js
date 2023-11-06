import React, { useState } from "react";
import {
  Modal,
  Paper,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../services/fairbaseConfig";
import "../assets/styles/modalWindow.css";

const CreatePlaylistModal = ({ open, onClose, onCreatePlaylist }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    const storage = getStorage(app);
    const storageRef = ref(storage, `images/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
      });
    });
  };

  const handleCreatePlaylist = () => {
    if (!playlistName || !imageUrl) {
      return;
    }

    onCreatePlaylist(playlistName, imageUrl, playlistDescription);

    setPlaylistName("");
    setSelectedImage(null);
    setImageUrl("");
    setPlaylistDescription("");
  };

  const photoSelectButtonStyle = {
    width: "270px",
    height: "280px",
    margin: "10px",
    background: isHovered
      ? "linear-gradient(to bottom, #000000 0%, #222121 100%)"
      : "linear-gradient(to bottom, #000000 0%, #444444 100%)",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          width: "600px",
          height: "350px",
          background: "linear-gradient(to bottom, #000000 0%, #222121 60%)",
        }}
      >
        <Grid container spacing={2} style={{ height: "100%" }}>
          <Grid item xs={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="image-input"
              />
              <label
                htmlFor="image-input"
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <IconButton
                  color="primary"
                  component="span"
                  style={photoSelectButtonStyle}
                >
                  {isHovered ? (
                    <>
                      <AddAPhotoIcon />
                      <Typography variant="subtitle1">
                        Выбрать фото
                      </Typography>
                    </>
                  ) : (
                    <img
                      src={imageUrl} 
                      alt="Selected Image"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: imageUrl ? "block" : "none", 
                      }}
                    />
                  )}
                </IconButton>
              </label>
            </div>
          </Grid>
          <Grid item xs={6}>
            <Typography color={"white"} variant="h6">
               Создать плейлист
            </Typography>
            <input
              label="Название плейлиста"
              className="input-fields-modal"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
            />
            <input
              label="Описание плейлиста"
              className="input-fields-modal"
              value={playlistDescription}
              onChange={(e) => setPlaylistDescription(e.target.value)}
              fullWidth
            />
            <Button className="button-18" onClick={handleCreatePlaylist}>
              Создать плейлист
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default CreatePlaylistModal;
