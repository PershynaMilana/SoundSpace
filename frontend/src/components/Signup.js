import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/styles.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import GoogleIcon from "./images/google.png";
import FacebookIcon from "./images/facebook.png";

const Signup = () => {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const sendRequest = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/signup", {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => history("/login"));
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className="container forms">
            <div className="form login">
                <div className="form-content">
                    <header className="header-login">
                        Sign up for Sound Space
                    </header>

                    <form
                        style={{
                            Maxwidth: "300px",
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
                            Maxwidth: "300px",
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
