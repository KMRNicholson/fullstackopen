import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/Anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addAnecdote: (state, action) => [...state, action.payload],
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

export const { addAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => async dispatch => {
  const anecdotes = await anecdoteService.getAll()
  dispatch(setAnecdotes(anecdotes))
}

export const createNew = anecdote => async dispatch => {
  const newAnecdote = await anecdoteService.createNew(anecdote)
  dispatch(addAnecdote(newAnecdote))
}

export default anecdoteSlice.reducer
