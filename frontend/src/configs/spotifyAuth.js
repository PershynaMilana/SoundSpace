import axios from "axios";

export const clientId = "897fe6d6d0b74dea8034725aad7fae27";
export const clientSecret = "e0d354ef58574551a3b14f58df3c0364";

const getToken = async () => {
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
        }
    );
    return response.data.access_token;
};

export default getToken;
