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
import { app } from "../services/fairbaseConfig";
import "../assets/styles/modalWindow.css";
import DefaultPhoto from "../assets/images/default-image.jpg";

const EditProfileInfoModal = ({ open, onClose, onEditProfile }) => {
    const [profileName, setProfileName] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [isHovered, setIsHovered] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);

        const storage = getStorage(app);
        const storageRef = ref(storage, `profileimages/${file.name}`);
        uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrl(url);
            });
        });
    };

    const handleEditProfile = () => {
        if (!profileName || !imageUrl) {
            return;
        }

        onEditProfile(profileName, imageUrl);

        setProfileName("");
        setSelectedImage(null);
        setImageUrl("");
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
                                            <AddAPhotoIcon
                                                style={addPhotoIconStyle}
                                            />
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
                            Edit profile
                        </Typography>
                        <br />
                        <Typography color={"white"} variant="p">
                            Profile name:
                        </Typography>
                        <input
                            style={{ marginTop: "10px", marginBottom: "10px" }}
                            label="Profile name"
                            className="input-fields-modal"
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                        />
                        <Button
                            className="button-18"
                            onClick={handleEditProfile}
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
                            Edit
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    );
};

export default EditProfileInfoModal;
