import TopSongList from "./TopSongList";
import TopArtistList from "./TopArtistList";
import SpotifyWebApi from "spotify-web-api-node";
import useCode from "./useCode";
import { useEffect, useState } from "react";
import ProfileProvider from "./ProfileProvider";

const spotifyApi = new SpotifyWebApi({
  clientId: 'de155cc222404532929c2cb5b50b4127'
});

export default function Dashboard(props) {

  const code = props.code;
  const accessToken = useCode(code);

  useEffect(() => {
    if (!accessToken) return;
    // spotifyApi.setAccessToken(accessToken);
    spotifyApi.getMe()
    .then(data => {
      console.log(data.body.display_name)
    })
  }, [accessToken]);

  return (
    <div className='dashboard bg-success-subtle d-flex'>
      {/* <h1 className='fw-bold m-3'>{name}'s Dashboard</h1> */}
      <TopSongList accessToken={accessToken} spotifyApi={spotifyApi}/>
      <TopArtistList accessToken={accessToken} spotifyApi={spotifyApi}/>
    </div>

  );
}