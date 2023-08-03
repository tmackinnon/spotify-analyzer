// load .env data into process.env
require('dotenv').config();

//server config
const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const querystring = require('node:querystring');
const cookieParser = require('cookie-parser');
const request = require('request');

//establish key for cookies
const stateKey = 'spotify_auth_state';

const app = express();
const port = 8080;

//middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false})); // HTML forms, jQuery's serialize()
app.use(express.json()); // populates req.body
app.use(cookieParser());

//helper function
const generateRandomString = function(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

//import routers
const apiRouter = require('./routes/api');
//use routers
app.use('/api', apiRouter);

//code pulled from spotify web-api-examples repo//
app.get('/login', (req, res) => {

  //create key-value & set as cookie
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'code',
    client_id: process.env.CLIENTID,
    scope: scope,
    redirect_uri: process.env.REDIRECT_URI,
    state: state
  }));
});


//code pulled from spotify web-api-examples repo//
app.get('/callback', (req, res) => {

  //pull out token code and state and new cookie value provided by spotify's authentication
  // if none provided make variables null
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  //check state is available and matches 
  if (state === null || state !== storedState) {
    //if no match redirect
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(process.env.CLIENTID + ':' + process.env.CLIENT_SECRET).toString('base64'))
      },
      json: true
    };

    //post request to get profile data 
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        const access_token = body.access_token;
        const refresh_token = body.refresh_token;

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log('request-body', body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('http://localhost:3002/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('http://localhost:3002/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
})

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
})