import { useState } from 'react'

const Header = (props) =>
  <h1>
    {props.title}
  </h1>

const Stat = (props) =>
  <div>
    {props.label} {props.value}
  </div>

const Feedback = (props) =>
  <div>
    <Header title='give feedback'/>
    <button onClick={props.clickHandler('good')}>
      good
    </button>
    <button onClick={props.clickHandler('neutral')}>
      neutral
    </button>
    <button onClick={props.clickHandler('bad')}>
      bad
    </button>
  </div>
  
const Statistics = (props) =>
  <div>
    <Header title='statistics'/>
    {props.statistics}
  </div>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const stateMap = new Map()
  stateMap.set('good', good)
  stateMap.set('neutral', neutral)
  stateMap.set('bad', bad)

  const statistics = new Array()
  stateMap.forEach((value, label) => {
    statistics.push(<Stat key={label} label={label} value={value}/>)
  })

  const handleClick = (feedback) => () => {
    switch (feedback) {
      case 'good':
        setGood(good + 1)
        break;

      case 'neutral':
        setNeutral(neutral + 1)
        break;

      case 'bad':
        setBad(bad + 1)
        break;
    
      default:
        break;
    }
  }

  return (
    <div>
      <Feedback clickHandler={handleClick}/>
      <Statistics statistics={statistics}/>
    </div>
  )
}

export default App