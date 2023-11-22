import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/account.css";

function UserProfile() {
    const [userData, setUserData] = useState({});
    const [updatedName, setUpdatedName] = useState("");
    const [updatedEmail, setUpdatedEmail] = useState("");
    const [updateMessage, setUpdateMessage] = useState(null);
    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2U1NTA1YWRmMGZmOWFmMWVhMmZmMyIsImlhdCI6MTY5OTAxNjM3NCwiZXhwIjoxNjk5MDE5OTc0fQ.LPLmfH-FWPDKIynhCepARWyh-Fg3vDXCJFheZAGMVoE";

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUserData(response.data.user);
                setUpdatedName(response.data.user.name);
                setUpdatedEmail(response.data.user.email);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [token]);

    const handleHomeClick = () => {
        window.location.href = `/home`;
    };

    const handleSaveClick = () => {
        if (
            updatedName.trim() === "" ||
            updatedEmail.trim() === "" ||
            (updatedName === userData.name && updatedEmail === userData.email)
        ) {
            setUpdateMessage("Please make changes before saving.");
            return;
        }

        axios
            .post(
                "http://localhost:8080/api/update-profile",
                { name: updatedName, email: updatedEmail },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                setUserData(response.data.user);
                setUpdatedName(response.data.user.name);
                setUpdatedEmail(response.data.user.email);
                setUpdateMessage("Data updated successfully");
            })
            .catch((error) => {
                console.error(error);
                setUpdateMessage("Failed to update data");
            });
    };


    return (
        <div className="profile-container">
            <h2>Edit Profile</h2>
            {updateMessage && (
                <div
                    className={
                        updateMessage === "Data updated successfully"
                            ? "success-message"
                            : "error-message"
                    }
                >
                    {updateMessage}
                </div>
            )}
            <div className="input-container">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                        width: "100%",
                    }}
                >
                    <label className="labels-inputs" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        className="input-fields"
                    />
                </div>
            </div>
            <div className="input-container" style={{ textAlign: "left" }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                        width: "100%",
                    }}
                >
                    <label className="labels-inputs" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={updatedEmail}
                        onChange={(e) => setUpdatedEmail(e.target.value)}
                        className="input-fields"
                    />
                </div>
            </div>
            <div
                className="line-second"
                style={{ margin: "20px", maxWidth: "500px", width: "100%" }}
            ></div>
            <div
                style={{
                    display: "flex",
                    maxWidth: "450px",
                    width: "100%",
                    height: "100px",
                    justifyContent: "flex-end",
                }}
            >
                <button className="button-172" onClick={handleHomeClick}>
                    Cancel
                </button>
                <button className="button-17" onClick={handleSaveClick}>
                    Save Changes
                </button>
            </div>
        </div>
    );
}

export default UserProfile;
