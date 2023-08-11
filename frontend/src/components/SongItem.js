export default function SongItem(props) {

  return (
    <tbody>
      <tr>
        <td>{props.trackNum}</td>
        <td>{props.name}</td>
        <td>{props.artist}</td>
        <td>2:00</td>
      </tr>
    </tbody>
  )
}