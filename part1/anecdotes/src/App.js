import { useState } from 'react'

const Header = (props) =>
  <h1>
    {props.title}
  </h1>

const Options = (props) =>
  <div>
    <button onClick={props.handleVote}>
      vote
    </button>
    <button onClick={props.handleNext}>
      next anecdote
    </button>
  </div>

const Anecdote = (props) =>
  <div>
    <Header title={props.title}/>
    <p>{props.text}</p>
    <p>has {props.votes} votes</p>
  </div>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const rand = () => Math.floor(Math.random() * anecdotes.length)
  const getSelectedVotes = () => anecdotes.findIndex((anecdote)=>anecdote===selected)

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(anecdotes[rand()])

  const handleNext = () => setSelected(anecdotes[rand()])
  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[getSelectedVotes()] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <Anecdote title='Anecdote of the day' text={selected} votes={votes[getSelectedVotes()]}/>
      <Options handleNext={handleNext} handleVote={handleVote}/>
      <Anecdote title='Anecdote with most votes' text={anecdotes[votes.indexOf(Math.max(...votes))]} votes={votes[votes.indexOf(Math.max(...votes))]}/>
    </div>
  )
}

export default App