import { app } from "../services/fairbaseConfig";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, query, where } from 'firebase/firestore';
import { createContext, useContext, useState, useEffect } from "react";
import LikesNotification from "../components/LikesNotification";
const db = getFirestore(app);

const LikesContext = createContext();

export const LikesProvider = ({ children }) => {
  const [likedTracks, setLikedTracks] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tracksCollection = collection(db, "likedTracks");
        const tracksSnapshot = await getDocs(tracksCollection);
        const data = tracksSnapshot.docs.map((doc) => doc.data());
        setLikedTracks(data);
      } catch (error) {
        console.error("Error fetching liked tracks: ", error);
      }
    };

    fetchData();
  }, []);

  const addToLikes = async (track) => {
    setLikedTracks((prevLikedTracks) => [...prevLikedTracks, track]);
    const tracksCollection = collection(db, "likedTracks");
    await addDoc(tracksCollection, track);
    setNotification("Like added!");
  };

  const removeFromLikes = async (trackId) => {
    setLikedTracks((prevLikedTracks) =>
      prevLikedTracks.filter((likedTrack) => likedTrack.id !== trackId)
    );

    const tracksCollection = collection(db, "likedTracks");
    const q = query(tracksCollection, where("id", "==", trackId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  };

  return (
    <LikesContext.Provider value={{ likedTracks, addToLikes, removeFromLikes }}>
      {children}
      {notification && <LikesNotification message={notification} onClose={() => setNotification(null)}/>}
    </LikesContext.Provider>
  );
};

export const useLikes = () => {
  return useContext(LikesContext);
};
