import TopSongs from "./TopSongs";
import SpotifyWebApi from "spotify-web-api-node";
import useCode from "./useCode";
import axios from "axios";

export default function Dashboard(props) {

  const code = props.code;
  const accessToken = useCode(code);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Code: {props.code}</h2>
      <h3>Access token: {accessToken}</h3>
      {/* <TopSongs accessToken={accessToken}/> */}
    </div>
  )
}