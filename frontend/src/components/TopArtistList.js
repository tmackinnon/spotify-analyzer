import { useEffect, useState } from 'react';
import SongItem from './SongItem';
import Table from 'react-bootstrap/Table';
import TimeRangeToggle from './TimeRangeToggle';

export default function TopArtistList(props) {

  const [topArtists, setTopArtists] = useState([]);
  const [clickedButton, setClickedButton] = useState('short_term');
  const spotifyApi = props.spotifyApi;
  const accessToken = props.accessToken

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getMyTopArtists({
      limit: 20,
      time_range: clickedButton
    })
      .then(function(data) {
        setTopArtists(data.body.items);
        console.log(data.body);
      })
      .catch(function(err) {
        console.log('Something went wrong!', err);
      });
  }, [accessToken, spotifyApi, clickedButton]);

  const artists = topArtists.map((artist, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          <div className='d-flex'>
            <img src={artist.images[1].url} alt='album cover' height={64} className="pe-3 align-middle"></img>
            <h4>{artist.name}</h4>
          </div>
        </td>
      </tr>
    )
  })

  return (
    <div className='m-5'>
      <h1 className='fw-bold'>Top Artists</h1>
      <TimeRangeToggle setClickedButton={setClickedButton} type={'artists'} defaultValue={'artists-0'}/>
      <div className='shadow' style={{ height: '600px', overflowY: 'auto', width: '400px'}}>
        <Table striped bordered hover className='m-0'>
          <thead>
            <tr>
              <th className='text-center'>#</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {artists}
          </tbody>
        </Table>
      </div>
    </div>
  )
}