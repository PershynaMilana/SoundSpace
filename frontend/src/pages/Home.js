import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clientId, clientSecret } from "../services/spotifyAuth";
import HomeContent from "../content/HomeContent";

const Home = () => {
    const [popularPlaylists, setPopularPlaylists] = useState([]);
    const [artists, setArtists] = useState([]);
    const [newReleases, setNewReleases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [playlistIndex, setPlaylistIndex] = useState(0);
    const navigate = useNavigate();
    const [artistIndex, setArtistIndex] = useState(0);
    const [releaseIndex, setReleaseIndex] = useState(0);

    const handleNextArtist = () => {
        if (artistIndex + 6 < artists.length) {
            setArtistIndex((prevIndex) => prevIndex + 6);
        }
    };

    const handlePrevArtist = () => {
        if (artistIndex - 6 >= 0) {
            setArtistIndex((prevIndex) => prevIndex - 6);
        }
    };

    const handleNextRelease = () => {
        setReleaseIndex((prevIndex) => prevIndex + 6);
    };

    const handlePrevRelease = () => {
        setReleaseIndex((prevIndex) => Math.max(0, prevIndex - 6));
    };

    const handleNextPlaylist = () => {
        setPlaylistIndex((prevIndex) => prevIndex + 6);
    };

    const handlePrevPlaylist = () => {
        setPlaylistIndex((prevIndex) => Math.max(0, prevIndex - 6));
    };

    useEffect(() => {
        const getToken = async () => {
            try {
                const response = await axios.post(
                    "https://accounts.spotify.com/api/token",
                    null,
                    {
                        params: {
                            grant_type: "client_credentials",
                        },
                        auth: {
                            username: clientId,
                            password: clientSecret,
                        },
                        withCredentials: false,
                    }
                );
                return response.data.access_token;
            } catch (error) {
                console.error("Ошибка при получении токена:", error);
                return null;
            }
        };

        const getPopularPlaylists = async (token) => {
            try {
                const response = await axios.get(
                    "https://api.spotify.com/v1/browse/featured-playlists",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        withCredentials: false,
                    }
                );
                return response.data.playlists.items.slice(0, 20);
            } catch (error) {
                console.error(
                    "Ошибка при получении популярных плейлистов:",
                    error
                );
                return [];
            }
        };

        const getArtistInfo = async (token) => {
            try {
                const artistIds = [
                    "1Xyo4u8uXC1ZmMpatF05PJ", // The Weeknd 1
                    "3TVXtAsR1Inumwj472S9r4", // Drake 2
                    "1vCWHaC5f2uS3yhpwWbIA6", // Avicii 3
                    "1HY2Jd0NmPuamShAr6KMms", // Lady Gaga 4
                    "6qqNVTkY8uBg9cP3Jd7DAH", // Billie Eilish 5
                    "0du5cEVh5yTK9QJze8zA0C", // Bruno Mars 6
                    "246dkjvS1zLTtiykXe5h60", // Post Malone 7
                    "4gzpq5DPGxSnKTe4SA8HAU", // Coldplay 8
                    "66CXWjxzNUsdJxJ2JdwvnR", // Ariana Grande 9
                    "4MCBfE4596Uoi2O4DtmEMz", // Juice WRLD 10
                    "4nDoRrQiYLoBzwC5BhVJzF", // Camila Cabello 11
                    "0ohUvVskERzK18bvWXFEqi", // GONE.Fludd 12
                    "00FQb4jTyendYWaN8pK0wa", // Lana Del Rey 13
                    "7ITMCzIU9uII8gwRg8JAhc", // Odetari 14
                    "7cYEt1pqMgXJdq00hAwVpT", // Chase Atlantic 15
                    "77SW9BnxLY8rJ0RciFqkHh", // The Neighbourhood 16
                    "1nccv1GNVkBdvsYi2FB5FB", // Nueki 17
                    "0iEtIxbK0KxaSlF7G42ZOp", // Metro Boomin 18
                    "3MZsBdqDrRTJihTHQrO6Dq", // Joji 19
                    "7Ln80lUS6He07XvHI8qqHH", // Arctic Monkeys 20
                ];
                const artistsInfoPromises = artistIds.map(async (artistId) => {
                    const response = await axios.get(
                        `https://api.spotify.com/v1/artists/${artistId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            withCredentials: false,
                        }
                    );
                    return response.data;
                });
                const artistsInfo = await Promise.all(artistsInfoPromises);
                return artistsInfo;
            } catch (error) {
                console.error(
                    "Ошибка при получении информации об артистах:",
                    error
                );
                return [];
            }
        };

        const getNewReleases = async (token) => {
            try {
                const response = await axios.get(
                    "https://api.spotify.com/v1/browse/new-releases",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        withCredentials: false,
                    }
                );
                return response.data.albums.items.slice(0, 20);
            } catch (error) {
                console.error("Ошибка при получении новых релизов:", error);
                return [];
            }
        };

        const fetchData = async () => {
            const token = await getToken();
            if (token) {
                const playlists = await getPopularPlaylists(token);
                const artistInfo = await getArtistInfo(token);
                const releases = await getNewReleases(token);

                setPopularPlaylists(playlists);
                setArtists(artistInfo);
                setNewReleases(releases);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <HomeContent
            loading={loading}
            popularPlaylists={popularPlaylists}
            playlistIndex={playlistIndex}
            artists={artists}
            artistIndex={artistIndex}
            newReleases={newReleases}
            releaseIndex={releaseIndex}
            handlePrevPlaylist={handlePrevPlaylist}
            handleNextPlaylist={handleNextPlaylist}
            handlePrevArtist={handlePrevArtist}
            handleNextArtist={handleNextArtist}
            handlePrevRelease={handlePrevRelease}
            handleNextRelease={handleNextRelease}
            navigate={navigate}
        />
    );
};

export default Home;
