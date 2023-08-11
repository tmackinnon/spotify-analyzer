import './TopSongList.scss';
import { useEffect, useState } from 'react';
import SongItem from './SongItem';
import Table from 'react-bootstrap/Table'

export default function TopSongList(props) {

  const [topSongs, setTopSongs] = useState([])
  const spotifyApi = props.spotifyApi;
  const accessToken = props.accessToken

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getMyTopTracks({
      limit: 10,
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

  const songs = topSongs.map((song, index) => {
    return (
      <SongItem
        key={song.id}
        trackNum={index+1}
        name={song.name}
        artist={song.artists[0].name}
      />
    )
  })

  return (
    <div className='top-song-list'>
      <h1>My Top Songs</h1>
      <Table striped bordered hover variant='dark' responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Album</th>
            <th>Length</th>
          </tr>
        </thead>
        {songs}
      </Table>
    </div>
  )
}