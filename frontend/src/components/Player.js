import React, { useEffect } from "react";
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
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
            }}
        />
    );
};

document.styleSheets[0].insertRule(`
    #audio-player::-webkit-media-controls-panel,
    #audio-player::-webkit-media-controls-mute-button,
    #audio-player::-webkit-media-controls-play-button,
    #audio-player::-webkit-media-controls-timeline-container,
    #audio-player::-webkit-media-controls-current-time-display,
    #audio-player::-webkit-media-controls-time-remaining-display,
    #audio-player::-webkit-media-controls-timeline,
    #audio-player::-webkit-media-controls-volume-slider-container,
    #audio-player::-webkit-media-controls-volume-slider,
    #audio-player::-webkit-media-controls-seek-back-button,
    #audio-player::-webkit-media-controls-seek-forward-button,
    #audio-player::-webkit-media-controls-fullscreen-button,
    #audio-player::-webkit-media-controls-rewind-button,
    #audio-player::-webkit-media-controls-return-to-realtime-button,
    #audio-player::-webkit-media-controls-toggle-closed-captions-button {
        background-color: #333333 !important;
        border-radius: 5px !important;
    }
`, 0);

document.styleSheets[0].insertRule(`
    #audio-player::-webkit-media-controls-button,
    #audio-player::-webkit-media-controls-slider,
    #audio-player::-webkit-media-controls-slider-thumb {
        color: green !important;
        border-radius: 5px !important;
    }
`, 1);

export default Player;