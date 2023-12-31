// load .env data into process.env
require('dotenv').config();

//server config
const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
// const querystring = require('node:querystring');
const cookieParser = require('cookie-parser');
// const request = require('request');
const SpotifyWebApi = require("spotify-web-api-node")

//establish key for cookies
const stateKey = 'spotify_auth_state';

const app = express();
const port = 8080;

//middleware
app.use(morgan('dev'));
app.use(cors({
  origin: ['http://localhost:3000'],
}));
app.use(express.urlencoded({extended: false})); // HTML forms, jQuery's serialize()
app.use(express.json()); // populates req.body
app.use(cookieParser());

//
//SPOTIFY AUTHENTICATION//
//
app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(400);
    })
})

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: refreshToken
  });

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      console.log('The access token has been refreshed')
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(400);
    })
})


app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});