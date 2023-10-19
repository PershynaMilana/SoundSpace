import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/account.css';

function UserProfile() {
  const [userData, setUserData] = useState({});
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updateMessage, setUpdateMessage] = useState(null);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmU3MzIzMzEwOTVkYWJlZTRhNDBlMSIsImlhdCI6MTY5NzY0MTIxOSwiZXhwIjoxNjk3NjQ0ODE5fQ.cgSDzvqMRUY_cN9ygl9PNtnTvMKJOOXLwYzOVD_tvIA";

  useEffect(() => {
    axios.get('http://localhost:5000/api/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
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

  const handleSaveClick = () => {
    if (
      (updatedName.trim() === '' || updatedEmail.trim() === '') || 
      (updatedName === userData.name && updatedEmail === userData.email)
    ) {
      setUpdateMessage("Please make changes before saving.");
      return;
    }

    axios.post(
      'http://localhost:5000/api/update-profile',
      { name: updatedName, email: updatedEmail },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
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
          <div className={updateMessage === "Data updated successfully" ? "success-message" : "error-message"}>
            {updateMessage}
          </div>
        )}
          <div className="input-container">
        <label className="label" htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          className="input-fields"
        />
      </div>
      <div className="input-container">
        <label className="label" htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={updatedEmail}
          onChange={(e) => setUpdatedEmail(e.target.value)}
          className="input-fields"
        />
      </div>
      <div className="separator"></div>
      <button className="button-17" onClick={handleSaveClick}>Save Changes</button>
    </div>
  );
}

export default UserProfile;