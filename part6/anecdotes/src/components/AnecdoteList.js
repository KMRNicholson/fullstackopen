import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, vote }) =>
  <div>
    <p>{ anecdote.content }</p>
    <p>has { anecdote.votes } votes</p>
    <button onClick={vote(anecdote)}>
      vote
    </button>
  </div>

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => _.orderBy(state, 'votes', 'desc'))
  
  const vote = anecdote => () => dispatch(voteAnecdote(anecdote))
  
  return (
    <div>
      { anecdotes.map(anecdote => <Anecdote key={Number((Math.random() * 1000000).toFixed(0))} anecdote={anecdote} vote={vote} />) }
    </div>
  )
}

export default AnecdoteList