import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

export default function TopSongs(props) {

  const [topSongs, setTopSongs] = useState('')

  console.log(props.accessToken)

  useEffect(() => {
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(props.accessToken);

    spotifyApi.getMyTopTracks(props.accessToken)
      .then(function(data) {
        setTopSongs(data.body.items);
        console.log(data.body.items);
      })
      .catch(function(err) {
        console.log('Something went wrong!', err);
      });
  }, [props.accessToken]);

  return (
    <>
      {topSongs ? (
        <ul>
          {topSongs.map((song, index) => (
            <li key={index}>{song.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}