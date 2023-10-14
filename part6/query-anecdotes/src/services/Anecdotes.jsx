import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes' 

const getAll = () => axios.get(baseUrl).then(res => res.data)

const createNew = content => axios.post(baseUrl, { content, votes: 0 }).then(res => res.data)

const updateExisting = anecdote => axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then(res => res.data)

const anecdoteService = { 
  getAll,
  createNew ,
  updateExisting
}

export default anecdoteService