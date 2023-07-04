import { useState } from 'react'

const Header = (props) =>
  <h1>
    {props.title}
  </h1>

const StatisticsLine = (props) =>
  <div>
    {props.text} {props.value}
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
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: '0%'
  })

  var statistics = 'No feedback given'

  if(feedback.all != 0){
    statistics = new Array()
    for(const key in feedback){
      statistics.push(<StatisticsLine key={key} text={key} value={feedback[key]}/>)
    }
  }
  
  const handleClick = (feedbackClicked) => () => {
    const newFeedback = {...feedback}

    switch (feedbackClicked) {
      case 'good':
        newFeedback.good = newFeedback.good + 1
        break;

      case 'neutral':
        newFeedback.neutral = newFeedback.neutral + 1
        break;

      case 'bad':
        newFeedback.bad = newFeedback.bad + 1
        break;
    
      default:
        break;
    }

    newFeedback.all = newFeedback.good + newFeedback.bad + newFeedback.neutral
    newFeedback.average = (newFeedback.good - newFeedback.bad) / newFeedback.all

    const positive = newFeedback.good / newFeedback.all * 100
    newFeedback.positive = `${positive}%`

    setFeedback(newFeedback)
  }

  return (
    <div>
      <Feedback clickHandler={handleClick}/>
      <Statistics statistics={statistics}/>
    </div>
  )
}

export default App