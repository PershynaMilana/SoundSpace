import React, { useEffect, forwardRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { usePlayer } from "../services/PlayerContext";

const Player = forwardRef(({ audioPlayerRef }, ref) => {
    const { currentTrack } = usePlayer();
    const [trackInfo, setTrackInfo] = useState({
        imageUrl: localStorage.getItem("imageUrl") || "",
        trackName: localStorage.getItem("trackName") || "",
        artistName: localStorage.getItem("artistName") || "",
        preview_url: localStorage.getItem("preview_url") || "",
    });

    useEffect(() => {
        if (audioPlayerRef && audioPlayerRef.current) {
            audioPlayerRef.current.src = currentTrack?.preview_url || "";
        }

        if (currentTrack) {
            const imageUrl = currentTrack?.album.images[0]?.url || "";
            const trackName = currentTrack?.name || "";
            const artistName = currentTrack?.artists[0]?.name || "";
            const preview_url = currentTrack?.preview_url || "";

            localStorage.setItem("imageUrl", imageUrl);
            localStorage.setItem("trackName", trackName);
            localStorage.setItem("artistName", artistName);
            localStorage.setItem("preview_url", preview_url);

            setTrackInfo({
                imageUrl,
                trackName,
                artistName,
                preview_url,
            });
        }
    }, [currentTrack, audioPlayerRef]);

    const customStyles = {
        "--rhap-time-color": "#fff",
        background: "#0d0d0d",
        width: "90%",
        height: "30%",
        marginBottom: "60px",
        paddingRight: "50px",
        boxShadow: "none",
    };

    return (
        <div
            className="custom-audio-player"
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                backgroundColor: "#0d0d0d",
                display: "flex",
                alignItems: "center",
                height: "9%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "25px",
                    color: "#868686",
                }}
            >
                {trackInfo.imageUrl && (
                    <img
                        src={trackInfo.imageUrl}
                        alt="Track"
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "5px",
                        }}
                    />
                )}
                <div style={{ marginLeft: "10px", width: "200px" }}>
                    <p style={{ margin: 0, color: "#afafaf" }}>
                        {trackInfo.trackName}
                    </p>
                    <p
                        style={{
                            margin: 0,
                            fontSize: "0.8em",
                            color: "#868686",
                        }}
                    >
                        {trackInfo.artistName}
                    </p>
                </div>
            </div>
            <AudioPlayer
                ref={audioPlayerRef}
                src={trackInfo.preview_url}
                autoPlay={false}
                loop={false}
                volume={1.0}
                muted={false}
                preload="auto"
                listenInterval={1}
                style={customStyles}
                showFilledProgress={true}
                autoPlayAfterSrcChange={true}
                showFilledVolume={true}
            />
        </div>
    );
});

export default Player;
