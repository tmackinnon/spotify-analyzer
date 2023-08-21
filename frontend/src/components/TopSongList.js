import { useEffect, useState } from 'react';
import SongItem from './SongItem';
import Table from 'react-bootstrap/Table';
import TimeRangeToggle from './TimeRangeToggle';

export default function TopSongList(props) {

  const [topSongs, setTopSongs] = useState([]);
  const [clickedButton, setClickedButton] = useState('short_term');
  const spotifyApi = props.spotifyApi;
  const accessToken = props.accessToken;

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getMyTopTracks({
      limit: 20,
      time_range: clickedButton
    })
      .then(function(data) {
        setTopSongs(data.body.items);
        console.log(data.body);
      })
      .catch(function(err) {
        console.log('Something went wrong!', err);
      });
  }, [accessToken, spotifyApi, clickedButton]);

  const songs = topSongs.map((song, index) => {
    return (
      <SongItem
        key={song.uri}
        trackNum={index+1}
        image={song.album.images[2].url}
        name={song.name}
        artist={song.artists[0].name}
        album={song.album.name}
        duration={song.duration_ms}
      />
    )
  })

  return (
    <>
      <h1 className='fw-bold'>Top Songs</h1>
      <TimeRangeToggle setClickedButton={setClickedButton} type={'songs'}/>
      <div className='shadow' style={{ height: '700px', overflowY: 'auto'}}>
        <Table striped bordered className='m-0'>
          <thead>
            <tr>
              <th className='text-center'>#</th>
              <th>Title</th>
              <th>Album</th>
              <th className='text-end pe-3'>Length</th>
            </tr>
          </thead>
          <tbody>
            {songs}
          </tbody>
        </Table>
      </div>
    </>
  )
}