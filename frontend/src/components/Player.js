import React, { useEffect, useContext } from "react";
import { usePlayer } from "../services/PlayerContext";

const Player = () => {
    const { currentTrack, playPauseHandler } = usePlayer();
    useEffect(() => {
        const audioPlayer = document.getElementById("audio-player");
        if (!audioPlayer) {
            console.error("Audio player not found");
            return;
        }
        if (currentTrack && currentTrack.preview_url) {
            audioPlayer.src = currentTrack.preview_url;
            const playPromise = audioPlayer.play();
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.error("Failed to play audio:", error);
                });
            }
        } else {
            audioPlayer.pause();
        }
        const handleEnded = () => {
            playPauseHandler();
        };
        audioPlayer.addEventListener("ended", handleEnded);
        return () => {
            audioPlayer.removeEventListener("ended", handleEnded);
        };
    }, [currentTrack, playPauseHandler]);

    return (
        <audio
            id="audio-player"
            controls
            style={{ position: "fixed", bottom: 0, left: 0, width: "100%" }}
        />
    );
};

export default Player;
