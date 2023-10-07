import _ from 'lodash'

const Header = ({ title }) =>
  <h1>
    { title }
  </h1>

const StatisticsLine = ({ text, value }) =>
  <tr>
    <td>{ text }</td>
    <td>{ value }</td>
  </tr>

const Feedback = ({ clickHandler }) =>
  <div>
    <button onClick={clickHandler('good')}>
      good
    </button>
    <button onClick={clickHandler('neutral')}>
      neutral
    </button>
    <button onClick={clickHandler('bad')}>
      bad
    </button>
    <button onClick={clickHandler('reset')}>
      reset
    </button>
  </div>
  
const Statistics = ({ statistics }) =>
  <div>
    <table>
      <tbody>
        { statistics }
      </tbody>
    </table>
  </div>

const App = ({ store }) => {
  const feedback = store.getState()
  const statistics = _.forEach(feedback, (value, key) => 
    <StatisticsLine key={ key } text={ key } value={ value }/>)
  
  const handleClick = feedbackClicked => () => store.dispatch({ type: feedbackClicked })

  return (
    <div>
      <Header title='give feedback'/>
      <Feedback store={store} clickHandler={handleClick}/>
      <Header title='statistics'/>
      { feedback.all === 0 ? 
        <p>No feedback given</p> : 
        <Statistics statistics={ statistics }/> 
      }
    </div>
  )
}

export default App