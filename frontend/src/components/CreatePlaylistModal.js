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

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../configs/fairbaseConfig";
import "../assets/styles/modalWindow.css";
import DefaultPhoto from "../assets/images/default-image.jpg";

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
            ? "linear-gradient(to bottom, #222222 0%, #222222 100%)"
            : "linear-gradient(to bottom, #222222 0%, #222222 100%)",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    };

    const addPhotoIconStyle = {
        color: "white",
    };

    const backgroundImageStyle = {
        position: "absolute",
        zIndex: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: isHovered ? 0.5 : 1,
        borderRadius: "5px",
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
                    height: "300px",
                    background: "#333333",
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
                                    {imageUrl && (
                                        <img
                                            src={imageUrl}
                                            alt="Selected Image"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                position: "absolute",
                                                zIndex: 1,
                                                borderRadius: "5px",
                                            }}
                                        />
                                    )}
                                    <img
                                        src={DefaultPhoto}
                                        alt="Default Image"
                                        style={{ ...backgroundImageStyle }}
                                    />
                                    {isHovered && !imageUrl && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                zIndex: 2,
                                            }}
                                        >
                                            <AddAPhotoIcon style={addPhotoIconStyle} />
                                            <Typography
                                                style={{ color: "white" }}
                                                variant="subtitle1"
                                            >
                                                Select photo
                                            </Typography>
                                        </div>
                                    )}
                                </IconButton>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <br />
                        <Typography
                            color={"white"}
                            variant="h5"
                            style={{ fontWeight: "500" }}
                        >
                            Create playlist
                        </Typography>
                        <br />
                        <Typography color={"white"} variant="p">
                            Playlist title:
                        </Typography>
                        <input
                            style={{ marginTop: "10px", marginBottom: "10px" }}
                            label="Название плейлиста"
                            className="input-fields-modal"
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                        />
                        <br />
                        <Typography color={"white"} variant="p">
                            Playlist description:
                        </Typography>
                        <input
                            style={{ marginTop: "10px", marginBottom: "10px" }}
                            label="Описание плейлиста"
                            className="input-fields-modal"
                            value={playlistDescription}
                            onChange={(e) => setPlaylistDescription(e.target.value)}
                            fullWidth
                        />
                        <Button
                            className="button-18"
                            onClick={handleCreatePlaylist}
                            style={{
                                justifyContent: "center",
                                aligniItems: "center",
                                margin: "10px",
                                marginLeft: "20px",
                                borderRadius: "30px",
                                backgroundColor: "#cccccc",
                                color: "black",
                                fontWeight: "600",
                            }}
                        >
                            Create playlist
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    );
};

export default CreatePlaylistModal;
