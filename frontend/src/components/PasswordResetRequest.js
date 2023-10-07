import React, { useState } from 'react';
import axios from 'axios';

import './styles/styles.css';
const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [isRequestSent, setIsRequestSent] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetRequest = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/password-reset-request', {
        email: email,
      });
      setIsRequestSent(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="container forms">
      <div className="form">
        <header>Password Reset</header>
        <h4>
  Enter the Sound Space email address you provided when registering.<br />
  We will send you an email with a link to reset your password.
</h4>

        <form>
          <div className="field">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="field">
            <button onClick={handleResetRequest}>Send</button>
          </div>
        </form>
        {isRequestSent && (
          <p>Check your email for password reset instructions.</p>
        )}
      </div>
    </section>
  );
};
export default PasswordResetRequest;

