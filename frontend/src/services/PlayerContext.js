import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { app } from "../services/fairbaseConfig";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [latestTracks, setLatestTracks] = useState([]);
    const db = getFirestore(app);
  
    const setTrack = (trackUrl) => {
      setCurrentTrack(trackUrl);
      addPlayedTrackToFirebase(trackUrl);
    };
  
    const addPlayedTrackToFirebase = async (trackUrl) => {
      try {
        const docRef = await addDoc(collection(db, "playedTracks"), {
          trackUrl,
          timestamp: new Date(),
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
  
    const getLatestPlayedTracks = async () => {
      const q = query(
        collection(db, "playedTracks"),
        orderBy("timestamp", "desc"),
        limit(20)
      );
  
      const querySnapshot = await getDocs(q);
  
      const latestTracks = [];
      querySnapshot.forEach((doc) => {
        latestTracks.push(doc.data().trackUrl);
      });
  
      console.log("Latest played tracks: ", latestTracks);
      return latestTracks; 
    };
  
    useEffect(() => {
      const fetchLatestTracks = async () => {
        const tracks = await getLatestPlayedTracks();
        setLatestTracks(tracks);
      };
  
      fetchLatestTracks();
    }, []);

  return (
    <PlayerContext.Provider value={{ currentTrack, setTrack, getLatestPlayedTracks }}>
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
