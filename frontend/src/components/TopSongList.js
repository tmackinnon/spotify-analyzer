import { useEffect, useState } from 'react';
import SongItem from './SongItem';
import Table from 'react-bootstrap/Table';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

export default function TopSongList(props) {

  const [topSongs, setTopSongs] = useState([]);
  const [clickedButtons, setClickedButtons] = useState({
    short_term: true,
    medium_term: false,
    long_term: false
  });
  const spotifyApi = props.spotifyApi;
  const accessToken = props.accessToken

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getMyTopTracks({
      limit: 20,
      time_range: 'short_term'
    })
      .then(function(data) {
        setTopSongs(data.body.items);
        console.log(data.body);
      })
      .catch(function(err) {
        console.log('Something went wrong!', err);
      });
  }, [accessToken, spotifyApi]);

  const updateTimeRange = function(time_range) {
    const buttons = {
      short_term: false,
      medium_term: false,
      long_term: false
    };
    buttons[time_range] = true;
    setClickedButtons(buttons);
  }

  const buttons = Object.keys(clickedButtons).map((button, index) => {
    return (
        <ToggleButton className='rounded-0' key={index} id={button} value={index} onClick={() => {updateTimeRange(button)}}>
          {button}
        </ToggleButton>
    )
  })

  const songs = topSongs.map((song, index) => {
    return (
      <SongItem
        key={song.id}
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
    <div className='w-50 m-5 h-50'>
      <h1 className='fw-bold'>Top Songs</h1>
      <ToggleButtonGroup type="radio" name="time-range-options" defaultValue={0}>
        {buttons}
      </ToggleButtonGroup>
      <Table striped bordered hover responsive className='shadow'>
        <thead>
          <tr>
            <th className='text-center'>#</th>
            <th>Title</th>
            <th>Album</th>
            <th className='text-end'>Length</th>
          </tr>
        </thead>
        {songs}
      </Table>
    </div>
  )
}