import { DiaryEntry } from '../types'

const Entry = (props: DiaryEntry) => {
  const { date, weather, visibility } = props
  
  return (
    <>
      <h3>{date}</h3>
      <p>Visibility: {visibility}</p>
      <p>Weather: {weather}</p>
      {props.comment && <p>Comment: {props.comment}</p>}
    </>
  )
}

export { Entry }
