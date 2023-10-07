import { useState } from 'react'
import _ from 'lodash'

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
  const anecdoteList = [
    {
      content: 'If it hurts, do it more often.',
      votes: 0
    },
    {
      content: 'Adding manpower to a late software project makes it later!',
      votes: 0
    },
    {
      content: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0
    },
    {
      content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0
    },
    {
      content: 'Premature optimization is the root of all evil.',
      votes: 0
    },
    {
      content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0
    },
    {
      content: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      votes: 0
    },
    {
      content: 'The only way to go fast, is to go well.',
      votes: 0
    }
  ]

  const rand = () => Math.floor(Math.random() * anecdotes.length)

  const [anecdotes, setAnecdotes] = useState(anecdoteList)
  const [anecdoteOfDay, setAnecdoteOfDay] = useState(anecdotes[rand()])

  const getHighestVotes = () => _.head(_.orderBy(anecdotes, 'votes', 'desc'))

  const handleNext = () => setAnecdoteOfDay(anecdotes[rand()])
  const handleVote = anecdote => () => {
    const newAnecdotes = anecdotes.map(anec => anec.content === anecdote.content ? { content: anec.content, votes: ++anec.votes } : anec)
    setAnecdotes(newAnecdotes)
  }

  return (
    <div>
      <Header title='Anecdote of the day'/>
      <Anecdote anecdote={anecdoteOfDay} handleNext={handleNext} handleVote={handleVote} />
      <Header title='Anecdote with most votes'/>
      <Anecdote anecdote={getHighestVotes()} handleNext={handleNext} handleVote={handleVote} />
    </div>
  )
}

export default App