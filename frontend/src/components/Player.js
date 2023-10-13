import prevIcon from "./images/prev2.png";
import playIcon from "./images/play2.png";
import nextIcon from "./images/next2.png";
import loopIcon from "./images/loop2.png";
import volumeIcon from "./images/volume2.png";
import likeIcon from "./images/like2.png";
import musicIcon from "./images/music_image.png";

const Player = () => {

    return (
        <div className="player-panel" style={{ backgroundColor: "black", paddingBottom: '25px', position: 'fixed', bottom: 0, left: 0, width: '100%', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space between' }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
          <div className="track-info" style={{ display: 'flex', alignItems: 'center', paddingTop: '25px' }}>
            <img src={musicIcon} alt="Song Image" style={{ width: "50px", height: "50px", margin: "7px" }} />
            <p style={{ color: '#FFFFFF', marginLeft: '10px' }}>Song name - Author</p>
          </div>
        </div>
        <div style={{ alignItems: 'center', marginTop: '5px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>     
            <div style={{ display: 'flex', alignItems: 'center', paddingTop: "7px" }}>
              <img src={prevIcon} alt="Back" className="control-button" style={{ width: "30px", height: "20px", marginLeft: "15px", marginRight: "15px", paddingTop: "10px" }} />
              <img src={playIcon} alt="Play/Pause" className="control-button" style={{ width: "42px", height: "42px", marginLeft: "15px", marginRight: "15px", paddingTop: "7px" }} />
              <img src={nextIcon} alt="Next" className="control-button" style={{ width: "30px", height: "20px", marginLeft: "15px", marginRight: "15px", paddingTop: "10px" }} />
              <img src={loopIcon} alt="Loop" className="control-button" style={{ width: "30px", height: "30px", marginLeft: "15px", marginRight: "15px", paddingTop: "15px" }} />
            </div>
            <input type="range" style={{ width: "720px", marginTop: "12px"}}/>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px', paddingTop: '25px' }}>
          <img src={volumeIcon} alt="Volume" className="sound-button" style={{ width: "20px", height: "20px", margin: "7px" }} />
          <input type="range" style={{ width: "160px", margin: "12px"}}/>
          <button className="like-button"><img src={likeIcon} alt="Like" className="like-button" style={{ width: "20px", height: "20px", paddingLeft: "17px" }} /></button>
        </div>
      </div>
    );
  };
  
  export default Player;