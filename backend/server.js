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
  origin: ['http://localhost:3002'],
}));
app.use(express.urlencoded({extended: false})); // HTML forms, jQuery's serialize()
app.use(express.json()); // populates req.body
app.use(cookieParser());

//helper function
// const generateRandomString = function(length) {
//   let text = '';
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// };

//import routers
// const apiRouter = require('./routes/api');
//use routers
// app.use('/api', apiRouter);

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
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    })
})


app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});