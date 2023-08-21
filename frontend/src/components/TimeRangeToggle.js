import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

export default function TimeRangeToggle(props) {

  const timeRanges = [
    {title: '1 month', range: 'short_term'}, 
    {title: '6 months', range: 'medium_term'}, 
    {title: 'Overall', range: 'long_term'}
  ];

  console.log(props.defaultValue)

  const updateTimeRange = function(time_range) {
    props.setClickedButton(time_range);
  }

  const buttons = timeRanges.map((button, index) => {
    const uniqueID = `${props.type}-${index}`
    
    return (
        <ToggleButton className='rounded-0 btn-secondary' key={uniqueID} id={uniqueID} value={uniqueID} onClick={() => {updateTimeRange(button.range)}}>
          {button.title}
        </ToggleButton>
    )
  })

  return(
    <ToggleButtonGroup type="radio" name="time-range-options" defaultValue={props.defaultValue}>
      {buttons}
    </ToggleButtonGroup>
  )
}