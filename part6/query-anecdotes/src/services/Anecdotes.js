import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes' 

const getAll = () => axios.get(baseUrl).then(res => res.data)

const createNew = async content => {
  const anecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const updateExisting = async anecdote => {
  const url = `${baseUrl}/${anecdote.id}`
  const response = await axios.put(url, anecdote)
  return response.data
}

const anecdoteService = { 
  getAll,
  createNew ,
  updateExisting
}

export default anecdoteService