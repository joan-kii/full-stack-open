import { useState } from 'react'

const Button = (props) => {
  const {text, handelClick} = props
  return <button type='button' onClick={handelClick}>{text}</button>
}

const Statistics = (props) => {
  const {all, average, positive} = props
  return (
    <>
      <StatisticLine text="All" value={all} />
      <StatisticLine text="Average" value={average} />
      <StatisticLine text="Positive" value={positive + '%'} />
    </>
  )
}

const StatisticLine = (props) => {
  const {text, value} = props
  return <p>{text} {value}</p>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
    const actualGood = good + 1
    const actualAll = all + 1
    setAverage((actualGood - bad) / actualAll)
    setPositive((actualGood / actualAll) * 100)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    const actualAll = all + 1
    setAverage((good - bad) / actualAll)
    setPositive((good / actualAll) * 100)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    const actualBad = bad + 1
    const actualAll = all + 1
    setAverage((good - actualBad) / actualAll)
    setPositive((good / actualAll) * 100)
  }

  return (
    <>
      <h1>Give Feedback</h1>
      <div>
        <Button text="Good" handelClick={handleGoodClick}/>
        <Button text="Neutral" handelClick={handleNeutralClick} />
        <Button text="Bad" handelClick={handleBadClick} />
      </div>
      <h2>Statistics</h2>
      <div>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        {all > 0 ? 
          <Statistics all={all} average={average} positive={positive} /> : 
          <p>No feedback given</p>}
      </div>
    </>
  )
}

export default App
