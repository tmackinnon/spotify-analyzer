export default function SongItem(props) {

  const convertMilliseconds = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    let seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <tr>
      <td className="text-center">{props.trackNum}</td>
      <td>
        <div className='d-flex'>
          <img src={props.image} alt='album cover' height={64} className="pe-3 align-middle"></img>
          <div>
            <p className="fw-semibold m-0">{props.name}</p>
            <p className="m-0">{props.artist}</p>
          </div>
        </div>
      </td>
      <td>{props.album}</td>
      <td className='text-end pe-3'>{convertMilliseconds(props.duration)}</td>
    </tr>
  )
}