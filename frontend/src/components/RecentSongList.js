import { useState, useEffect } from "react";
import SongItem from "./SongItem";
import Table from "react-bootstrap/esm/Table";

export default function RecentSongList(props) {
  const [recentSongs, setRecentSongs] = useState([]);
  const spotifyApi = props.spotifyApi;
  const accessToken = props.accessToken;

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getMyRecentlyPlayedTracks({
      limit : 20
    })
      .then(function(data) {
        setRecentSongs(data.body.items);
        console.log(data.body.items);
      })
      .catch(function(err) {
        console.log('Something went wrong!', err);
      });
  }, [accessToken, spotifyApi]);

  const songs = recentSongs.map((song, index) => {
    return (
      <SongItem
        key={song.track.uri}
        trackNum={index+1}
        image={song.track.album.images[2].url}
        name={song.track.name}
        artist={song.track.artists[0].name}
        album={song.track.album.name}
        duration={song.track.duration_ms}
      />
    )
  })


  return (
    <>
      <h1 className='fw-bold'>Recently Played Songs</h1>
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