export default function Login() {

  const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=de155cc222404532929c2cb5b50b4127&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-top-read%20user-read-playback-state%20user-modify-playback-state"

  return (
    <div className="d-flex flex-column align-items-center mt-5 pt-5">
      <h1>Login to Spotify</h1>
      <a className='btn btn-success btn-lg m-2 w-25 mt-3 fw-semibold'href={AUTH_URL}>Login</a>
    </div>
  )
}