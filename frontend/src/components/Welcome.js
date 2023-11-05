import axios from "axios";
import React, { useEffect, useState } from "react";

axios.defaults.withCredentials = true;

const Welcome = () => {
    const [user, setUser] = useState(null);

    const refreshToken = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/refresh", {
                withCredentials: true,
            });

            if (res.data) {
                return res.data;
            } else {
                throw new Error("Empty response from refreshToken");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const sendRequest = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/user", {
                withCredentials: true,
            });
            const data = res.data;
            return data;
        } catch (error) {
            console.error(error.response.data);
            throw error;
        }
    };

    useEffect(() => {
        if (!user) {
            sendRequest()
                .then((data) => setUser(data.user))
                .catch((error) => console.error(error));
        }

        let interval = setInterval(() => {
            refreshToken()
                .then((data) => setUser(data.user))
                .catch((error) => console.error(error));
        }, 1000 * 29);

        return () => clearInterval(interval);
    }, [user]);
    return <div></div>;
};

export default Welcome;
