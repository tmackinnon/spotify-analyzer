import { useEffect, useState } from 'react';
import SongItem from './SongItem';
import Table from 'react-bootstrap/Table';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

export default function TopSongList(props) {

  const [topSongs, setTopSongs] = useState([]);
  const [clickedButton, setClickedButton] = useState('short_term');
  const spotifyApi = props.spotifyApi;
  const accessToken = props.accessToken
  const timeRanges = [{title: '1 month', range: 'short_term'}, {title: '6 months', range: 'medium_term'}, {title: 'Overall', range: 'long_term'}];

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

  const updateTimeRange = function(time_range) {
    setClickedButton(time_range);
  }

  const buttons = timeRanges.map((button, index) => {
    return (
        <ToggleButton className='rounded-0 btn-secondary' key={index} id={button.title} value={index} onClick={() => {updateTimeRange(button.range)}}>
          {button.title}
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
    <>
      <div className='m-5'>
        <h1 className='fw-bold'>Top Songs</h1>
        <ToggleButtonGroup type="radio" name="time-range-options" defaultValue={0}>
          {buttons}
        </ToggleButtonGroup>
        <div className='shadow' style={{ height: '600px', overflowY: 'auto', width: '800px'}}>
          <Table striped bordered hover className='m-0'>
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
      </div>
    </>
  )
}