import TopSongs from "./TopSongs";

export default function Dashboard(props) {

  //remove tokens from URL
  window.location.hash = '';

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Access Token: {props.accessToken}</h2>
      <h2>Refresh Token: {props.refreshToken}</h2>
      <TopSongs accessToken={props.accessToken} refreshToken={props.refreshToken}/>
    </div>
  )
}