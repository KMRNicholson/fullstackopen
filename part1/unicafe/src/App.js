const Header = (props) =>
  <h1>
    {props.title}
  </h1>

const StatisticsLine = (props) =>
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>

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
    <button onClick={props.clickHandler('reset')}>
      reset
    </button>
  </div>
  
const Statistics = (props) =>
  <div>
    <Header title='statistics'/>
    <table>
      <tbody>
        {props.statistics}
      </tbody>
    </table>
  </div>

const App = ({ store }) => {
  const feedback = store.getState()

  var statistics = <tr><td>No feedback given</td></tr>

  if(feedback.all !== 0){
    statistics = []
    for(const key in feedback){
      statistics.push(<StatisticsLine key={key} text={key} value={feedback[key]}/>)
    }
  }
  
  const handleClick = feedbackClicked => () => store.dispatch({ type: feedbackClicked })

  return (
    <div>
      <Feedback store={store} clickHandler={handleClick}/>
      <Statistics statistics={statistics}/>
    </div>
  )
}

export default App