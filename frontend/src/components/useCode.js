import { useState, useEffect } from "react";
import axios from 'axios';

export default function useCode(code) {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [expiresIn, setExpiresIn] = useState('');

  useEffect(() => {
    axios
      .post("http://localhost:8080/login", {
        code,
      })
      .then(res => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");
      })
      .catch(() => {
        window.location = "/";
      });
  }, [code]);

  useEffect(() => {
    //only run this once we have a refreshToken & expiresIn 
    if (!refreshToken || !expiresIn) return;

    //setInterval so acess token is refreshed a min before expiry everytime
    const refreshInterval = setInterval(() => {
      axios.post('http://localhost:8080/refresh', {
        refreshToken,
      })
        .then(res => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        });
    }, (expiresIn - 60) * 1000);

    //clean up settimeout
    return () => clearInterval(refreshInterval);

  }, [refreshToken, expiresIn]);

  return accessToken;

}