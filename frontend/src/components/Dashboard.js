import './Dashboard.scss';
import TopSongList from "./TopSongList";
import SpotifyWebApi from "spotify-web-api-node";
import useCode from "./useCode";
import { useEffect, useState } from "react";

const spotifyApi = new SpotifyWebApi({
  clientId: 'de155cc222404532929c2cb5b50b4127'
});

export default function Dashboard(props) {

  const [name, setName] = useState('')
  const [displayPic, setDisplayPic] = useState('')

  const code = props.code;
  const accessToken = useCode(code);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getMe()
    .then(data => {
      // console.log(data)
      setName(data.body.display_name);
      setDisplayPic(data.body.images[1].url);
    })
  }, [accessToken]);

  return (
    <div className='dashboard'>
      <h1>{name}'s Dashboard</h1>
      {/* <img src={displayPic} alt='user' width="50%" height="50%"></img> */}
      <TopSongList accessToken={accessToken} spotifyApi={spotifyApi}/>
    </div>
  );
}