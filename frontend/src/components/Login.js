import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from './store';
import { useNavigate } from 'react-router-dom';
import './styles/styles.css';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const sendRequest = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        email: inputs.email,
        password: inputs.password,
      });
      const data = res.data;
      return data;
    } catch (err) {
      console.error(err);

      if (err.response) {
        if (err.response.status === 400) {
          setEmailError('Invalid email or password');
        } else if (err.response.status === 401) {
          setPasswordError('Incorrect password');
        } 
      } else {
      }
      throw err;
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === 'email') {
      setEmailError('');
    } else if (e.target.name === 'password') {
      setPasswordError('');
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then(() => dispatch(authActions.login()))
      .then(() => history('/home'));
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log('Logged in successfully:', credentialResponse);
    history('/home');
  };

  const handleGoogleLoginError = () => {
    console.error('Login Failed');
  };

  return (
    <section className="container forms">
      <div className="form login">
        <div className="form-content">
          <header>Login to Sound Space</header>
          <form onSubmit={handleSubmit}>
            <div className="media-options">
              <a href="#" className="field facebook">
                <FontAwesomeIcon icon={faFacebookSquare} className="facebook-icon" />
                <span>Login with Facebook</span>
              </a>
            </div>
            <br />
          <GoogleOAuthProvider clientId="277875242879-j6oolglhsdibvcaqabdo9q1r1cq8rca4.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />
          </GoogleOAuthProvider>
            <div className="line"></div>
            {emailError && <div className="error-message">{emailError}</div>}
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
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
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
              <div className="password-error-message">{passwordError}</div>
            </div>
            <div className="form-link">
              <a href="reset-password" className="forgot-pass">
                Forgot password?
              </a>
            </div>
            <div className="field button-field">
              <button type="submit">Login</button>
            </div>
          </form>
          
          <div className="line-second"></div>
          <div className="form-link">
            <span>
              Don't have an account? <a href="/signup" className="link signup-link">Signup</a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
