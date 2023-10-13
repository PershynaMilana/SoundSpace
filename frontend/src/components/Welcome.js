<<<<<<< HEAD
import axios from 'axios';
import prevIcon from "./images/prev.png";
import playIcon from "./images/play.png";
import nextIcon from "./images/next.png";
import loopIcon from "./images/loop.png";
import likeIcon from "./images/like.png";
import volumeIcon from "./images/volume.png";
import React, { useEffect, useState } from 'react';
=======
import axios from "axios";
import React, { useEffect, useState } from "react";
>>>>>>> eb59dc3 (Seventh commit)

axios.defaults.withCredentials = true;

const Welcome = () => {
    const [user, setUser] = useState(null);
<<<<<<< HEAD
    
=======

>>>>>>> eb59dc3 (Seventh commit)
    const refreshToken = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/refresh", {
                withCredentials: true,
            });

            if (res.data) {
                return res.data;
<<<<<<< HEAD
            } else {              
=======
            } else {
>>>>>>> eb59dc3 (Seventh commit)
                throw new Error("Empty response from refreshToken");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
<<<<<<< HEAD
    }

    const sendRequest = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/user', {
                withCredentials: true
=======
    };

    const sendRequest = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/user", {
                withCredentials: true,
>>>>>>> eb59dc3 (Seventh commit)
            });
            const data = res.data;
            return data;
        } catch (error) {
            console.error(error.response.data);
            throw error;
        }
    };
<<<<<<< HEAD

    useEffect(() => {
        if (!user) {
            sendRequest()
                .then(data => setUser(data.user))
                .catch(error => console.error(error));
        }
        
        let interval = setInterval(() => {
            refreshToken()
                .then(data => setUser(data.user))
                .catch(error => console.error(error));
        }, 1000 * 29);

        return () => clearInterval(interval);
    }, [user]);
    return (
        <div>
        <div className="player-panel" style={{ backgroundColor: '#f0f0f0', position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
            <img src={prevIcon} alt="Back" className="control-button" style={{ width: "20px", height: "20px", margin: "7px" }} />
            <img src={playIcon} alt="Play/Pause" className="control-button" style={{ width: "40px", height: "40px", margin: "7px" }}/>
            <img src={nextIcon} alt="Next" className="control-button" style={{ width: "20px", height: "20px", margin: "7px" }}/>
            <img src={loopIcon} alt="Loop" className="control-button" style={{ width: "30px", height: "30px", margin: "7px" }}/>
            <input type="range" className="track-progress" />
            <img src={volumeIcon} alt="Volume" className="sound-button" style={{ width: "25px", height: "25px", margin: "7px" }}/>
            <input type="range" className="sound-volume" />
            <div className="track-info">
              <p>Song name here</p>
              <button className="like-button"><img src={likeIcon} alt="Like" className="like-button" style={{ width: "20px", height: "20px", margin: "7px" }}/></button>
            </div>
          </div>          
        </div>
      );
}
=======
>>>>>>> eb59dc3 (Seventh commit)

    useEffect(() => {
        if (!user) {
            sendRequest()
                .then((data) => setUser(data.user))
                .catch((error) => console.error(error));
        }

        let interval = setInterval(() => {
            refreshToken()
                .then((data) => setUser(data.user))
                .catch((error) => console.error(error));
        }, 1000 * 29);

        return () => clearInterval(interval);
    }, [user]);
    return <div></div>;
};

export default Welcome;
