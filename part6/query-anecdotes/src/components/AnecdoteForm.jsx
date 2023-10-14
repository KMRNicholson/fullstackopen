import { useMutation, useQueryClient } from '@tanstack/react-query'

import anecdoteService from '../services/Anecdotes'
import { useNotificationDispatch } from '../contexts/NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(anecdoteService.createNew, {
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({ type: 'SHOW', payload: `created ${newAnecdote.content}`})
      setTimeout(() => dispatch({ type: 'HIDE' }), 5 * 1000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
