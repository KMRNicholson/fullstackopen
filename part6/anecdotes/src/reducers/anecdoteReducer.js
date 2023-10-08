import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      state.push({ content: action.payload, votes: 0 })
    },
    voteAnecdote: (state, action) => {
      const content = action.payload.content
      const anecdoteToUpdate = state.find(anecdote => anecdote.content === content)

      const updatedAnecdote = {
        ...anecdoteToUpdate,
        votes: ++anecdoteToUpdate.votes
      }

      state.map(anecdote => 
        anecdote.content !== content ? 
        anecdote 
        : updatedAnecdote
      )
    },
    setAnecdotes: (state, action) => action.payload
  }
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
