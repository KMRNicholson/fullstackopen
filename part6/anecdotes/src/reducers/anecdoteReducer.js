import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/Anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addAnecdote: (state, action) => [...state, action.payload],
    setAnecdotes: (state, action) => action.payload
  }
})

export const { addAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => async dispatch => {
  const anecdotes = await anecdoteService.getAll()
  dispatch(setAnecdotes(anecdotes))
}

export const createNew = anecdote => async dispatch => dispatch(addAnecdote(await anecdoteService.createNew(anecdote)))

export const voteFor = anecdote => async dispatch => {
  await anecdoteService.updateExisting({...anecdote, votes: anecdote.votes + 1 })
  dispatch(initializeAnecdotes())
}

export default anecdoteSlice.reducer
