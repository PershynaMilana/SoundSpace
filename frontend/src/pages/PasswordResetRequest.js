import React, { useState } from "react";
import axios from "axios";
import "../assets/styles/styles.css";
import is from "is_js";

const PasswordResetRequest = () => {
    const [email, setEmail] = useState("");
    const [isRequestSent, setIsRequestSent] = useState(false);
    const [emailError, setEmailError] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const validateEmail = () => {
        if (!is.email(email)) {
            setEmailError("Invalid email format.");
            return false;
        } else {
            setEmailError("");
            return true;
        }
    };

    const handleResetRequest = async (e) => {
        e.preventDefault();
        if (!validateEmail()) {
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:8080/api/password-reset-request",
                {
                    email: email,
                }
            );
            setIsRequestSent(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="container forms" style={{ marginTop: "20%", left: "50%", width: "100%", height: "100%" }}>
            <div className="form2">
                <header className="header-login" style={{ marginBottom: "50px" }}>
                    Password Reset
                </header>
                {isRequestSent ? (
                    <form style={{ Maxwidth: "300px", width: "100%", alignItems: "center", verticalAlign: "top" }}>
                        <div className="field input-field" style={{ textAlign: "left", marginLeft: "70px" }}>
                            <h2 className="labels-inputs" style={{ color: "grey", fontSize: "17px" }}>
                                Check your email for password reset instructions.
                            </h2>
                        </div>
                    </form>
                ) : (

                    <div>
                        <h4 className="labels-inputs" style={{ color: "grey", fontSize: "17px" }}>
                            Enter the Sound Space email address you provided when registering.
                            <br />
                            We will send you an email with a link to reset your password.
                        </h4>
                        <form style={{ Maxwidth: "300px", width: "100%", alignItems: "center", verticalAlign: "top" }}>
                            {emailError && (
                                <p className="error-message" style={{
                                    height: "10px", alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center", marginTop: "30px"
                                }}>{emailError}</p>
                            )}
                            <div className="field input-field" style={{ textAlign: "left", marginLeft: "70px" }}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <label className="labels-inputs" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        className="input"
                                        name="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <button onClick={handleResetRequest} style={{ marginTop: "30px", maxHeight: "50px", height: "100px" }}>
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </section>
    );
};
export default PasswordResetRequest;