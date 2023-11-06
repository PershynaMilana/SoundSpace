import React, { useState, useEffect } from "react";
import axios from "axios";
import getToken from "../services/spotifyAuth";

const Author = ({ artistName }) => {
    const [authorData, setAuthorData] = useState({
        name: "",
        image: "",
        tracks: [],
    });

    const fetchAuthorData = async () => {
        try {
            const accessToken = await getToken();

            if (artistName) {
                const artistResponse = await axios.get(
                    "https://api.spotify.com/v1/search",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                        params: {
                            q: artistName,
                            type: "artist",
                            limit: 1,
                        },
                    }
                );

                const artists = artistResponse.data.artists.items;

                if (artists.length > 0) {
                    const artist = artists[0];
                    const name = artist.name;
                    const images = artist.images;
                    const image = images.length > 0 ? images[0].url : "";

                    const tracksResponse = await axios.get(
                        `https://api.spotify.com/v1/artists/${artist.id}/top-tracks`,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                            params: {
                                country: "US",
                            },
                        }
                    );

                    const tracks = tracksResponse.data.tracks.map(
                        (track) => track.name
                    );

                    setAuthorData({ name, image, tracks });
                }
            }
        } catch (error) {
            console.error(
                "An error occurred while loading author data:",
                error
            );
            setAuthorData({ name: "Error", image: "", tracks: [] });
        }
    };

    useEffect(() => {
        if (artistName) {
            fetchAuthorData();
        }
    }, [artistName]);

    return (
        <div>
            <h1>{authorData.name}</h1>
            <div style={{ position: "relative" }}>
                <img
                    src={authorData.image}
                    alt={authorData.name}
                    style={{
                        width: "100%",
                        height: "400px",
                        objectFit: "cover",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "10px",
                        color: "white",
                        fontSize: "24px",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        padding: "5px 10px",
                        borderRadius: "5px",
                    }}
                >
                    {authorData.name}
                </div>
            </div>
            <h2>Tracks</h2>
            {authorData.tracks && authorData.tracks.length > 0 ? (
                <ul>
                    {authorData.tracks.map((track, index) => (
                        <li key={index}>{track}</li>
                    ))}
                </ul>
            ) : (
                <p>No tracks available</p>
            )}
        </div>
    );
};

export default Author;
