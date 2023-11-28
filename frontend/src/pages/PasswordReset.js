import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../assets/styles/styles.css";

const PasswordReset = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordReset, setIsPasswordReset] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    console.log(token);
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        validatePassword(e.target.value);
        if (confirmPassword === e.target.value) {
            setConfirmPasswordError("");
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        validateConfirmPassword(e.target.value);
    };

    const validatePassword = (newPassword) => {
        if (newPassword.length < 6 || !/[A-Z]/.test(newPassword)) {
            setPasswordError("Password should be at least 6 characters and contain at least one uppercase letter.");
        } else {
            setPasswordError("");
        }
    };

    const validateConfirmPassword = (confirmPassword) => {
        if (confirmPassword !== password) {
            setConfirmPasswordError("Passwords do not match.");
        } else {
            setConfirmPasswordError("");
        }
    };

    const handleResetPassword = async () => {
        console.log(token);
        if (passwordError || confirmPasswordError) {
            return;
        }

        try {
            console.log(token);
            const response = await axios.post(
                `http://localhost:8080/api/password-reset`,
                {
                    password: password,
                    confirmPassword: confirmPassword,
                    resetToken: token,
                }
            );
            setIsPasswordReset(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section
            className="container forms"
            style={{
                marginTop: "20%",
                left: " 50%",
                width: "100%",
                height: "100%",
            }}
        >
            <div
                className="form2"
                style={{
                    Maxwidth: "300px",
                    width: "100%",
                    alignItems: "center",
                    verticalAlign: "top",
                }}
            >
                <header
                    className="header-login"
                    style={{ marginBottom: "50px" }}
                >
                    Password Reset
                </header>
                {isPasswordReset ? (
                    <h3
                        className="labels-inputs"
                        style={{
                            color: "grey",
                            fontSize: "17px",
                            textAlign: "center",
                        }}
                    >
                        Your password has been successfully reset.
                    </h3>
                ) : (
                    <>
                        <div
                            className="field input-field"
                            style={{ textAlign: "left", marginLeft: "70px" }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <label
                                    className="labels-inputs"
                                    htmlFor="email"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                        </div>
                        {passwordError && (
                            <p
                                className="error-message"
                                style={{
                                    height: "15px",
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "30px",
                                }}
                            >
                                {passwordError}
                            </p>
                        )}
                        <div
                            className="field input-field"
                            style={{ textAlign: "left", marginLeft: "70px" }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <label
                                    className="labels-inputs"
                                    htmlFor="email"
                                >
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                            </div>
                        </div>
                        {confirmPasswordError && (
                            <p
                                className="error-message"
                                style={{
                                    height: "15px",
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "30px",
                                }}
                            >
                                {confirmPasswordError}
                            </p>
                        )}
                        <div className="field">
                            <button
                                onClick={handleResetPassword}
                                style={{
                                    marginTop: "30px",
                                    maxHeight: "50px",
                                    height: "100px",
                                }}
                            >
                                Reset Password
                            </button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};
export default PasswordReset;
