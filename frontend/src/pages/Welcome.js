import axios from 'axios';

import React, { useEffect, useState } from 'react';
axios.defaults.withCredentials = true
let firstRender = true;

const Welcome = () => {
    const [user,setUser] = useState();
    const refreshToken = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/refresh", {
                withCredentials: true
            });
            
            if (res.data) {
                return res.data;
            } else {              
                console.error("Empty response from refreshToken");
                throw new Error("Empty response");
            }
        } catch (error) {
            console.error(error);         
            throw error;
        }
    }
    const sednRequest = async() => {
        try {
            const res = await axios.get('http://localhost:8008/api/user', {
                withCredentials: true
            });
            const data = res.data;
            return data;
        } catch (error) {
            console.error(error.response.data);
            throw error;
        }
    };
    useEffect(() => {
        if(firstRender) {
            firstRender = false
            sednRequest().then((data) => setUser(data.user))
        }
        let interval = setInterval(() => {
            refreshToken().then(data=>setUser(data.user))
        },1000 * 29);
        return () => clearInterval(interval)
    },[])
}

export default Welcome 