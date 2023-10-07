import { useState } from 'react'
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
  const anecdotes = useSelector(state => state.anecdotes)
  const anecdoteOfTheDay = useSelector(state => state.anecdoteOfTheDay)

  const getHighestVotes = () => _.head(_.orderBy(anecdotes, 'votes', 'desc'))

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
      <Anecdote anecdote={anecdoteOfTheDay} handleNext={handleNext} handleVote={handleVote} />
      <Header title='Anecdote with most votes'/>
      <Anecdote anecdote={getHighestVotes()} handleNext={handleNext} handleVote={handleVote} />
      <Header title='New Anecdote'/>
      <form onSubmit={handleNew}>
        <input name="anecdote" /> 
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default App