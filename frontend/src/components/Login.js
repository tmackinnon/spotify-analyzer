export default function Login() {

  const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=de155cc222404532929c2cb5b50b4127&response_type=code&redirect_uri=http://localhost:3002/&scope=streaming%20user-read-email%20user-read-private%20user-top-read%20user-read-playback-state%20user-modify-playback-state"

  return (
    <>
      <h1>Login Page</h1>
      <a href={AUTH_URL}>Login with link</a>
    </>
  )
}