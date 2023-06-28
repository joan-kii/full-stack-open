import { useState } from 'react'

const Button = (props) => {
  const {text, count, handelClick} = props
  return <button type='button' onClick={() => handelClick(count + 1)}>{text}</button>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give Feedback</h1>
      <div>
        <Button text="good" count={good} handelClick={setGood}/>
        <Button text="neutral" count={neutral} handelClick={setNeutral} />
        <Button text="bad" count={bad} handelClick={setBad} />
      </div>
      <h2>Statistics</h2>
      <div>
        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
      </div>
    </>
  )
}

export default App
