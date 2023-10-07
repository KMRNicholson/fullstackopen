const voteAnecdote = () => {
  const newVotes = [...votes]
  newVotes[getSelectedVotes()] += 1
  setVotes(newVotes)
}