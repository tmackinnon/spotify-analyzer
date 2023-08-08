import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import Song from './Song';

export default function TopSongs(props) {

  const [topSongs, setTopSongs] = useState([])
  const spotifyApi = props.spotifyApi;
  const accessToken = props.accessToken

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getMyTopTracks({
      limit: 10,
      time_range: 'short_term'
    })
      .then(function(data) {
        setTopSongs(data.body.items);
        console.log(data.body);
      })
      .catch(function(err) {
        console.log('Something went wrong!', err);
      });
  }, [accessToken, spotifyApi]);

  const songs = topSongs.map((song) => {
    return (
      <Song
        key={song.id}
        name={song.name}
        artist={song.artists[0].name}
      />
    )
  })

  return (
    <div>
      <h1>Your Top Songs This Month:</h1>
      {songs}
    </div>
  )
}