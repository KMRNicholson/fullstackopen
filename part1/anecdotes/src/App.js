import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, nextAnecdote, createAnecdote } from './reducers/anecdoteReducer'

const Header = ({ title }) =>
  <h1>
    { title }
  </h1>

const Anecdote = ({ anecdote, handleVote, handleNext }) =>
  <div>
    <p>{ anecdote.content }</p>
    <p>has { anecdote.votes } votes</p>
    <button onClick={handleVote(anecdote)}>
      vote
    </button>
    <button onClick={handleNext}>
      next anecdote
    </button>
  </div>

const App = () => {
  const dispatch = useDispatch()
  const randomAnecdote = useSelector(state => state.randomAnecdote)
  const mostVotedAnecdote = useSelector(state => state.mostVotedAnecdote)

  const handleNext = () => dispatch(nextAnecdote())
  const handleVote = anecdote => () => dispatch(voteAnecdote(anecdote))
  const handleNew = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <Header title='Anecdote of the day'/>
      <Anecdote anecdote={randomAnecdote} handleNext={handleNext} handleVote={handleVote} />
      <Header title='Anecdote with most votes'/>
      <Anecdote anecdote={mostVotedAnecdote} handleNext={handleNext} handleVote={handleVote} />
      <Header title='New Anecdote'/>
      <form onSubmit={handleNew}>
        <input name="anecdote" /> 
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default App