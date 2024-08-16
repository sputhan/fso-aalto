import { useState } from 'react'



const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  return (
    
      <tr>
        <td>
          {text}
        </td>
        <td>
          {value}
        </td>

      </tr>

  
  )

}
const Statistics = ({ good, bad, neutral }) => {
  let total = (good + neutral + bad)
  let avg = 0
  let positive = 0
  if (total != 0) {
    avg = (good - bad) / (good + neutral + bad)
    positive = good / (good + neutral + bad)
    return (
      <div>
        <h2>statistics</h2>
        <table>
          <tbody>

          
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="average" value={avg} />
        <StatisticLine text="positive" value={positive} />
        </tbody>
        </table>


      </div>
    )
  }
  else {
    return (
      <div>
        <h2>statistics</h2>
        no feedback given
      </div>
    )
  }

}

const App = () => {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <Statistics good={good} bad={bad} neutral={neutral} />

    </div>
  )
}

export default App