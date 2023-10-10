import axios from 'axios';
import prevIcon from "./images/prev.png";
import playIcon from "./images/play.png";
import nextIcon from "./images/next.png";
import loopIcon from "./images/loop.png";
import volumeIcon from "./images/volume.png";
import likeIcon from "./images/like.png";
import React, { useEffect, useState } from 'react';

const Home = () => {
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

export default Home