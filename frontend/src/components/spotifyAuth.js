<<<<<<< HEAD
import axios from 'axios';

const clientId = '66f229a545fd41418f66f0aa93a4302a';
const clientSecret = 'dca09046541743cb9e11b2d2043bd033';

const getToken = async () => {
  const response = await axios.post('https://accounts.spotify.com/api/token', null, {
    params: {
      grant_type: 'client_credentials',
    },
    auth: {
      username: clientId,
      password: clientSecret,
    },
  });
  return response.data.access_token;
=======
import axios from "axios";

const clientId = "66f229a545fd41418f66f0aa93a4302a";
const clientSecret = "dca09046541743cb9e11b2d2043bd033";

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
>>>>>>> eb59dc3 (Seventh commit)
};

export default getToken;
