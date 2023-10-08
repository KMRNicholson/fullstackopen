import _ from 'lodash'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import anecdoteReducer, { voteAnecdote, setAnecdotes } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/Anecdotes'
import Filter from './Filter'

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
  const anecdotes = useSelector(state => 
    state.filter === '' ? 
    _.orderBy(state.anecdotes, 'votes', 'desc') : 
    _.orderBy(state.anecdotes, 'votes', 'desc').filter(anecdote => anecdote.content.includes(state.filter))
  )

  useEffect(() => {
    anecdoteService.getAll()
      .then(anecdotes => {
        dispatch(setAnecdotes(anecdotes))
      })
  }, [])
  
  const vote = anecdote => () => {
    dispatch(voteAnecdote(anecdote))
    dispatch(showNotification(`You voted for '${anecdote.content}'`))
    setTimeout(() => dispatch(hideNotification()), 5000)
  }
  
  return (
    <div>
      <Filter />
      { anecdotes.map(anecdote => <Anecdote key={Number((Math.random() * 1000000).toFixed(0))} anecdote={anecdote} vote={vote} />) }
    </div>
  )
}

export default AnecdoteList