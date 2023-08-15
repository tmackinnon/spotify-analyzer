export default function SongItem(props) {

  const convertMilliseconds = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    let seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <tbody>
      <tr>
        <td>{props.trackNum}</td>
        <td id='title'>
          <img src={props.image} alt="album cover" height={64}></img>
          <div>
            <p id='name'>{props.name}</p>
            <p>{props.artist}</p>
          </div>
        </td>
        <td>{props.album}</td>
        <td>{convertMilliseconds(props.duration)}</td>
      </tr>
    </tbody>
  )
}