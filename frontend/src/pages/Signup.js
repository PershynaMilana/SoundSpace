import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/styles/styles.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GoogleIcon from "../assets/images/google.png";
import FacebookIcon from "../assets/images/facebook.png";
import is from "is_js";

const Signup = () => {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formShifted, setFormShifted] = useState(false);

    const sendRequest = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/signup", {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
            });
            const data = res.data;
            return data;
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const validateName = () => {
        if (!is.capitalized(inputs.name) || inputs.name.length < 2) {
            setNameError(
                "Name should start with a capital letter and be at least 2 characters."
            );
            return false;
        } else {
            setNameError("");
            return true;
        }
    };

    const validateEmail = () => {
        if (!is.email(inputs.email)) {
            setEmailError("Invalid email format.");
            return false;
        } else {
            setEmailError("");
            return true;
        }
    };

    const validatePassword = () => {
        if (inputs.password.length < 6 || !/[A-Z]/.test(inputs.password)) {
            setPasswordError(
                "Password should be at least 6 characters and contain at least one uppercase letter."
            );
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        if (isNameValid && isEmailValid && isPasswordValid) {
            sendRequest().then(() => history("/login"));
        } else {
            setFormShifted(true);
        }
    };

    return (
        <section className="container forms">
            <div className="form login">
                {nameError && (
                    <p
                        className="error-message"
                        style={{
                            height: "3px",
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        {nameError}
                    </p>
                )}
                <div className="form-content">
                    <header className="header-login">
                        Sign up for Sound Space
                    </header>
                    <form
                        style={{
                            Maxwidth: "350px",
                            width: "100%",
                            alignItems: "center",
                            verticalAlign: "top",
                        }}
                    >
                        <div className="media-options">
                            <a
                                href="#"
                                className="field google"
                                style={{ textDecoration: "none" }}
                            >
                                <img
                                    src={FacebookIcon}
                                    alt="Facebook"
                                    className="facebook-img"
                                />
                                <span>Register with Facebook</span>
                            </a>
                        </div>
                        <div className="media-options">
                            <a
                                href="#"
                                className="field google"
                                style={{ textDecoration: "none" }}
                            >
                                <img
                                    src={GoogleIcon}
                                    alt="Google"
                                    className="google-img"
                                />
                                <span>Register with Google</span>
                            </a>
                        </div>
                    </form>
                    <div className="line-second"></div>
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            Maxwidth: "350px",
                            width: "100%",
                            alignItems: "center",
                        }}
                    >
                        <div
                            className="field input-field"
                            style={{ textAlign: "left" }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginLeft: "20px",
                                }}
                            >
                                <label className="labels-inputs" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter your name"
                                    className="input"
                                    name="name"
                                    value={inputs.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div
                            className="field input-field"
                            style={{ textAlign: "left", paddingTop: "20px" }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginLeft: "20px",
                                }}
                            >
                                <label
                                    className="labels-inputs"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    className="input"
                                    name="email"
                                    value={inputs.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div
                            className="field input-field"
                            style={{ textAlign: "left" }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginLeft: "20px",
                                }}
                            >
                                <label
                                    className="labels-inputs"
                                    htmlFor="password"
                                    style={{ marginTop: "20px" }}
                                >
                                    Password
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter your password"
                                    className="password"
                                    name="password"
                                    value={inputs.password}
                                    onChange={handleChange}
                                />
                            </div>
                            {showPassword ? (
                                <VisibilityIcon
                                    onClick={handleTogglePassword}
                                    className="eye-icon2"
                                />
                            ) : (
                                <VisibilityOffIcon
                                    onClick={handleTogglePassword}
                                    className="eye-icon2"
                                />
                            )}
                            <div
                                className="field button-field"
                                style={{ marginBottom: "20px" }}
                            >
                                <button type="submit">Sign up</button>
                            </div>
                        </div>
                    </form>
                    <br />
                    <div
                        className="line-second"
                        style={{ marginTop: "170px" }}
                    ></div>
                    <div className="form-link">
                        <span>
                            Already have an account?{" "}
                            <a href="/login" className="link signup-link">
                                Login
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Signup;
