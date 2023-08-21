import TopSongList from "./TopSongList";
import TopArtistList from "./TopArtistList";
import SpotifyWebApi from "spotify-web-api-node";
import useCode from "./useCode";
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from './Nav'

const spotifyApi = new SpotifyWebApi({
  clientId: 'de155cc222404532929c2cb5b50b4127'
});

export default function Dashboard(props) {

  const code = props.code;
  const accessToken = useCode(code);
  const [user, setUser] = useState('');

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.getMe()
    .then(data => {
      console.log(data.body)
      setUser(data.body.display_name);
    })
  }, [accessToken]);

  return (
    <>
      <Nav user={user}/>

      <div className="bg-success-subtle">
        <Container>
          <Row className="justify-content-between py-5">
            <Col lg={7} className="p-2">
              <TopSongList accessToken={accessToken} spotifyApi={spotifyApi}/>
            </Col>
            <Col lg={4} className="p-2">
              <TopArtistList accessToken={accessToken} spotifyApi={spotifyApi}/>
            </Col>
          </Row>
        </Container>
      </div>
    </>

  );
}