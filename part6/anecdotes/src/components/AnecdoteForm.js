import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { setNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async event => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    await dispatch(createNew(anecdote))
    dispatch(setNotification(`You created anecdote '${anecdote}'`, 5))
    setTimeout(() => dispatch(hideNotification()), 5000)
  }

  return (
    <div>
      <h2>New Anecdote</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" /> 
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm