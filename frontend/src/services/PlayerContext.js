import React, { createContext, useContext, useState } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const playPauseHandler = () => {
        setCurrentTrack(null);
    };
    return (
        <PlayerContext.Provider value={{ currentTrack, playPauseHandler }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error("usePlayer must be used within a PlayerProvider");
    }
    return context;
};
