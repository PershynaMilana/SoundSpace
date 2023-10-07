import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/styles.css';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import GoogleIcon from './images/google.png';


const Signup = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const sendRequest = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/signup', {
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
    <div className="container forms">
      <div className="form login">
        <div className="form-content">
          <header>Register and listen for free</header>
          <form onSubmit={handleSubmit}>
            <div className="media-options">
              <a href="#" className="field facebook">
              <FontAwesomeIcon icon={faFacebookSquare} className="facebook-icon" />
                <span>Register using Facebook</span>
              </a>
            </div>    
            <div className="media-options">
              <a href="#" className="field google">
              <img src={GoogleIcon} alt="Google" className="google-img" />
                <span>Register using Google</span>
              </a>
            </div>
            <div className="line"></div>
            <div className="field input-field">
              <input
                type="text"
                placeholder="Username"
                className="input"
                name="name"
                value={inputs.name}
                onChange={handleChange}
              />
            </div>
            <div className="field input-field">
              <input
                type="email"
                placeholder="Email"
                className="input"
                name="email"
                value={inputs.email}
                onChange={handleChange}
              />
            </div>
            <div className="field input-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                className="password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
              />
               {showPassword ? (
                <VisibilityIcon onClick={handleTogglePassword} className="eye-icon" />
              ) : (
                <VisibilityOffIcon onClick={handleTogglePassword} className="eye-icon" />
              )}
            </div>
            <div className="field button-field">
              <button type="submit">Signup</button>
            </div>
          </form>
          <div className="line-second"></div>
          <div className="form-link">
            <span>
              Already have an account? <a href="/login" className="link login-link">Login</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
