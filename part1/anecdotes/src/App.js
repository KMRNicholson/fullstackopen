import { useState } from 'react'
import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, nextAnecdote } from './reducers/anecdoteReducer'

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
  const anecdotes = useSelector(state => state.anecdotes)
  const anecdoteOfTheDay = useSelector(state => state.anecdoteOfTheDay)

  const getHighestVotes = () => _.head(_.orderBy(anecdotes, 'votes', 'desc'))

  const handleNext = () => dispatch(nextAnecdote())
  const handleVote = anecdote => () => dispatch(voteAnecdote(anecdote))

  return (
    <div>
      <Header title='Anecdote of the day'/>
      <Anecdote anecdote={anecdoteOfTheDay} handleNext={handleNext} handleVote={handleVote} />
      <Header title='Anecdote with most votes'/>
      <Anecdote anecdote={getHighestVotes()} handleNext={handleNext} handleVote={handleVote} />
    </div>
  )
}

export default App